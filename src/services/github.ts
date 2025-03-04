
import { GitHubIssue, GitHubRepo, GitHubBranch, GitHubPullRequest } from '../types/github';

class GitHubService {
  private token: string = '';
  private owner: string = '';
  private repo: string = '';
  private baseUrl = 'https://api.github.com';

  constructor() {}

  configure(token: string, owner: string, repo: string) {
    this.token = token;
    this.owner = owner;
    this.repo = repo;
  }

  private async request<T>(path: string, method: string = 'GET', body?: any): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }
    
    const options: RequestInit = {
      method,
      headers,
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
      
      return await response.json() as T;
    } catch (error) {
      console.error('GitHub API Request Error:', error);
      throw error;
    }
  }

  async getOpenIssues(labels?: string[]): Promise<GitHubIssue[]> {
    let path = `/repos/${this.owner}/${this.repo}/issues?state=open`;
    
    if (labels && labels.length > 0) {
      path += `&labels=${labels.join(',')}`;
    }
    
    return this.request<GitHubIssue[]>(path);
  }

  async getIssue(issueNumber: number): Promise<GitHubIssue> {
    const path = `/repos/${this.owner}/${this.repo}/issues/${issueNumber}`;
    return this.request<GitHubIssue>(path);
  }

  async getRepoInfo(): Promise<GitHubRepo> {
    const path = `/repos/${this.owner}/${this.repo}`;
    return this.request<GitHubRepo>(path);
  }

  async createBranch(branchName: string, fromBranch: string = 'main'): Promise<GitHubBranch> {
    // First, get the SHA of the latest commit on the base branch
    const path = `/repos/${this.owner}/${this.repo}/git/refs/heads/${fromBranch}`;
    const ref = await this.request<{object: {sha: string}}>(path);
    
    // Then create a new branch from that SHA
    const createPath = `/repos/${this.owner}/${this.repo}/git/refs`;
    const body = {
      ref: `refs/heads/${branchName}`,
      sha: ref.object.sha
    };
    
    return this.request<GitHubBranch>(createPath, 'POST', body);
  }

  async createFile(path: string, content: string, branch: string, message: string): Promise<void> {
    const apiPath = `/repos/${this.owner}/${this.repo}/contents/${path}`;
    const body = {
      message,
      content: btoa(content), // Base64 encode the content
      branch
    };
    
    await this.request(apiPath, 'PUT', body);
  }

  async updateFile(path: string, content: string, branch: string, message: string): Promise<void> {
    // First, get the current file to get its SHA
    const apiPath = `/repos/${this.owner}/${this.repo}/contents/${path}?ref=${branch}`;
    
    try {
      const file = await this.request<{sha: string}>(apiPath);
      
      // Then update the file with the new content
      const body = {
        message,
        content: btoa(content), // Base64 encode the content
        sha: file.sha,
        branch
      };
      
      await this.request(apiPath, 'PUT', body);
    } catch (error) {
      // If the file doesn't exist, create it instead
      await this.createFile(path, content, branch, message);
    }
  }

  async createPullRequest(title: string, body: string, head: string, base: string = 'main'): Promise<GitHubPullRequest> {
    const path = `/repos/${this.owner}/${this.repo}/pulls`;
    const prBody = {
      title,
      body,
      head,
      base
    };
    
    return this.request<GitHubPullRequest>(path, 'POST', prBody);
  }

  async getFileContent(path: string, branch: string = 'main'): Promise<string> {
    const apiPath = `/repos/${this.owner}/${this.repo}/contents/${path}?ref=${branch}`;
    
    try {
      const response = await this.request<{content: string, encoding: string}>(apiPath);
      
      if (response.encoding === 'base64') {
        return atob(response.content);
      }
      
      return response.content;
    } catch (error) {
      console.error(`Error fetching file ${path}:`, error);
      return '';
    }
  }
}

// Export singleton instance
export const githubService = new GitHubService();
