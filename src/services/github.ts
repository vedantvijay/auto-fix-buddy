
import { Octokit } from '@octokit/rest';
import { GitHubIssue, GitHubPullRequest, GitHubRepo, GitHubBranch } from '../types/github';

class GitHubService {
  private octokit: Octokit | null = null;
  private owner: string = '';
  private repo: string = '';

  configure(token: string, owner: string, repo: string) {
    this.octokit = new Octokit({ auth: token });
    this.owner = owner;
    this.repo = repo;
  }

  private checkConfiguration() {
    if (!this.octokit) {
      throw new Error('GitHub API not configured. Please set your token first.');
    }
  }

  async getOpenIssues(labels?: string[]): Promise<GitHubIssue[]> {
    this.checkConfiguration();
    
    try {
      const params: any = {
        owner: this.owner,
        repo: this.repo,
        state: 'open',
        per_page: 100,
      };
      
      if (labels && labels.length > 0) {
        params.labels = labels.join(',');
      }
      
      const response = await this.octokit!.issues.listForRepo(params);
      
      // Filter out pull requests (they are also returned by the issues endpoint)
      const issues = response.data.filter(issue => !issue.pull_request);
      
      return issues.map(issue => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        body: issue.body || '',
        state: issue.state,
        html_url: issue.html_url,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        labels: issue.labels.map((label: any) => ({ name: typeof label === 'string' ? label : label.name })),
        repository: {
          name: this.repo,
          owner: {
            login: this.owner
          }
        }
      }));
    } catch (error) {
      console.error('Error fetching GitHub issues:', error);
      throw error;
    }
  }

  async createBranch(branchName: string): Promise<void> {
    this.checkConfiguration();
    
    try {
      // Get the default branch to use as base
      const repoData = await this.octokit!.repos.get({
        owner: this.owner,
        repo: this.repo
      });
      
      const defaultBranch = repoData.data.default_branch;
      
      // Get the SHA of the latest commit on the default branch
      const refData = await this.octokit!.git.getRef({
        owner: this.owner,
        repo: this.repo,
        ref: `heads/${defaultBranch}`
      });
      
      const sha = refData.data.object.sha;
      
      // Create the new branch
      await this.octokit!.git.createRef({
        owner: this.owner,
        repo: this.repo,
        ref: `refs/heads/${branchName}`,
        sha
      });
    } catch (error) {
      console.error('Error creating branch:', error);
      throw error;
    }
  }

  async updateFile(path: string, content: string, branch: string, commitMessage: string): Promise<void> {
    this.checkConfiguration();
    
    try {
      // First try to get the file to see if it exists
      let existingFile;
      try {
        existingFile = await this.octokit!.repos.getContent({
          owner: this.owner,
          repo: this.repo,
          path,
          ref: branch
        });
      } catch (error: any) {
        if (error.status !== 404) {
          throw error;
        }
        // File doesn't exist, that's okay
      }
      
      const contentEncoded = Buffer.from(content).toString('base64');
      
      if (existingFile && 'data' in existingFile && existingFile.data.sha) {
        // Update existing file
        await this.octokit!.repos.createOrUpdateFileContents({
          owner: this.owner,
          repo: this.repo,
          path,
          message: commitMessage,
          content: contentEncoded,
          branch,
          sha: (existingFile.data as any).sha
        });
      } else {
        // Create new file
        await this.octokit!.repos.createOrUpdateFileContents({
          owner: this.owner,
          repo: this.repo,
          path,
          message: commitMessage,
          content: contentEncoded,
          branch
        });
      }
    } catch (error) {
      console.error('Error updating file:', error);
      throw error;
    }
  }

  async createPullRequest(title: string, body: string, branch: string): Promise<GitHubPullRequest> {
    this.checkConfiguration();
    
    try {
      // Get the default branch to use as base
      const repoData = await this.octokit!.repos.get({
        owner: this.owner,
        repo: this.repo
      });
      
      const defaultBranch = repoData.data.default_branch;
      
      // Create the pull request
      const response = await this.octokit!.pulls.create({
        owner: this.owner,
        repo: this.repo,
        title,
        body,
        head: branch,
        base: defaultBranch
      });
      
      return {
        number: response.data.number,
        html_url: response.data.html_url,
        state: response.data.state,
        title: response.data.title,
        body: response.data.body || '',
        created_at: response.data.created_at
      };
    } catch (error) {
      console.error('Error creating pull request:', error);
      throw error;
    }
  }

  async getRepository(): Promise<GitHubRepo> {
    this.checkConfiguration();
    
    try {
      const response = await this.octokit!.repos.get({
        owner: this.owner,
        repo: this.repo
      });
      
      return {
        name: response.data.name,
        owner: {
          login: response.data.owner.login
        },
        html_url: response.data.html_url
      };
    } catch (error) {
      console.error('Error fetching repository:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const githubService = new GitHubService();
