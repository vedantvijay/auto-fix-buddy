
import { AppConfig } from '../types/config';

class ConfigService {
  private config: AppConfig = {
    github: {
      owner: '',
      repository: '',
      token: ''
    },
    gemini: {
      apiKey: ''
    },
    options: {
      labels: [],
      skipTests: false,
      branchPrefix: 'autopr-fix-'
    }
  };

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const savedConfig = localStorage.getItem('autopr-config');
    
    if (savedConfig) {
      try {
        this.config = JSON.parse(savedConfig);
      } catch (error) {
        console.error('Error loading config from localStorage:', error);
      }
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('autopr-config', JSON.stringify(this.config));
  }

  getConfig(): AppConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<AppConfig>) {
    this.config = {
      ...this.config,
      ...newConfig,
      github: {
        ...this.config.github,
        ...(newConfig.github || {})
      },
      gemini: {
        ...this.config.gemini,
        ...(newConfig.gemini || {})
      },
      options: {
        ...this.config.options,
        ...(newConfig.options || {})
      }
    };
    
    this.saveToLocalStorage();
  }

  isConfigured(): boolean {
    return !!(
      this.config.github.owner &&
      this.config.github.repository &&
      this.config.github.token &&
      this.config.gemini.apiKey
    );
  }

  clearConfig() {
    localStorage.removeItem('autopr-config');
    this.config = {
      github: {
        owner: '',
        repository: '',
        token: ''
      },
      gemini: {
        apiKey: ''
      },
      options: {
        labels: [],
        skipTests: false,
        branchPrefix: 'autopr-fix-'
      }
    };
  }
}

// Export singleton instance
export const configService = new ConfigService();
