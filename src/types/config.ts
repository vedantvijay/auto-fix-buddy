
export interface AppConfig {
  github: {
    owner: string;
    repository: string;
    token: string;
  };
  gemini: {
    apiKey: string;
  };
  options: {
    labels: string[];
    skipTests: boolean;
    branchPrefix: string;
  };
}
