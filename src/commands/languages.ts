import { TranslateService } from '../services/translate';
import chalk from 'chalk';

export async function handleLanguagesCommand(): Promise<void> {
  try {
    const translateService = new TranslateService();
    const languages = await translateService.getSupportedLanguages();

    console.log('\nSupported Languages:');
    console.log('==================\n');

    // Sort languages by code
    languages.sort((a, b) => a.code.localeCompare(b.code));

    // Calculate max lengths for alignment
    const maxCodeLength = Math.max(...languages.map((lang) => lang.code.length));
    const maxNameLength = Math.max(...languages.map((lang) => lang.name.length));

    // Format and display each language
    languages.forEach((lang) => {
      const capabilities = [];
      if (lang.isSource) capabilities.push('Source');
      if (lang.isTarget) capabilities.push('Target');
      if (lang.supportsFormality) capabilities.push('Formality');

      console.log(
        `${chalk.green(lang.code.padEnd(maxCodeLength))} - ` +
          `${chalk.white(lang.name.padEnd(maxNameLength))} ` +
          `${chalk.gray('[' + capabilities.join(', ') + ']')}`
      );
    });

    console.log('\nUsage examples:');
    console.log(
      chalk.cyan('ct translate zh-TW') + ' - Translate clipboard content to Traditional Chinese'
    );
    console.log(
      chalk.cyan('ct translate en-US -f zh-TW') +
        ' - Translate Traditional Chinese text to American English\n'
    );
  } catch (error) {
    console.error(chalk.red('Error: Failed to fetch supported languages'));
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
    process.exit(1);
  }
}
