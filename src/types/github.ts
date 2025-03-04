
export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  labels: {
    name: string;
  }[];
  repository: {
    name: string;
    owner: {
      login: string;
    };
  };
}

export interface GitHubRepo {
  name: string;
  owner: {
    login: string;
  };
  html_url: string;
}

export interface GitHubBranch {
  name: string;
  commit: {
    sha: string;
  };
}

export interface GitHubPullRequest {
  number: number;
  html_url: string;
  state: string;
  title: string;
  body: string;
  created_at: string;
}
