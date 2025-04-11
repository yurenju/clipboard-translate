import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

interface Config {
  deeplApiKey?: string;
}

export class ConfigService {
  private configPath: string;
  private config: Config;

  constructor() {
    // Use platform-specific app config directory
    const configDir =
      process.platform === 'win32'
        ? path.join(os.homedir(), 'AppData', 'Roaming', 'clipboard-translate')
        : process.platform === 'darwin'
          ? path.join(os.homedir(), 'Library', 'Application Support', 'clipboard-translate')
          : path.join(os.homedir(), '.config', 'clipboard-translate');

    // Ensure config directory exists
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    this.configPath = path.join(configDir, 'config.json');
    this.config = this.loadConfig();
  }

  private loadConfig(): Config {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Failed to load config:', error);
    }
    return {};
  }

  private saveConfig(): void {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    } catch (error) {
      throw new Error(
        `Failed to save config: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  public getDeeplApiKey(): string | undefined {
    return this.config.deeplApiKey;
  }

  public setDeeplApiKey(apiKey: string): void {
    this.config.deeplApiKey = apiKey;
    this.saveConfig();
  }
}
