import { ConfigService } from '../services/config';
import chalk from 'chalk';

export async function handleSetApiKeyCommand(apiKey: string): Promise<void> {
  try {
    const configService = new ConfigService();
    configService.setDeeplApiKey(apiKey);
    console.log(chalk.green('✓ DeepL API key has been saved successfully'));
  } catch (error) {
    console.error(chalk.red('Error: Failed to save API key'));
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
    process.exit(1);
  }
}

export async function handleShowApiKeyCommand(): Promise<void> {
  try {
    const configService = new ConfigService();
    const apiKey = configService.getDeeplApiKey();

    if (apiKey) {
      console.log('\nCurrent DeepL API key:');
      console.log(chalk.green(apiKey));
    } else {
      console.log(chalk.yellow('No DeepL API key is currently set'));
      console.log('\nTo set an API key, use:');
      console.log(chalk.cyan('ct config set-api-key YOUR_API_KEY'));
    }
  } catch (error) {
    console.error(chalk.red('Error: Failed to read API key'));
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
    process.exit(1);
  }
}
