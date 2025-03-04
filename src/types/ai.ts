
export interface AIPrompt {
  issue: {
    title: string;
    body: string;
    number: number;
    repository: string;
  };
  codebase?: string; // Relevant code snippets from the repository
}

export interface AISolution {
  code: string;
  explanation: string;
  filesToModify: {
    path: string;
    content: string;
    reason: string;
  }[];
}
