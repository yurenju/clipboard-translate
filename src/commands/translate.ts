import { TranslateService } from '../services/translate';
import { ClipboardService } from '../services/clipboard';
import chalk from 'chalk';

interface TranslateCommandOptions {
  from?: string;
}

export async function handleTranslateCommand(
  target: string | undefined,
  options: TranslateCommandOptions
): Promise<void> {
  try {
    // Validate target language
    if (!target) {
      console.error(chalk.red('Error: Target language is required'));
      console.log('Example: ' + chalk.cyan('ct translate zh'));
      process.exit(1);
    }

    // Initialize services
    const translateService = new TranslateService();
    const clipboardService = new ClipboardService();

    // Read from clipboard
    console.log('Reading from clipboard...');
    const text = await clipboardService.readText();
    if (!text.trim()) {
      console.error(chalk.red('Error: Clipboard is empty'));
      process.exit(1);
    }

    // Show source text
    console.log('\nSource text:');
    console.log(chalk.gray(text));

    // Translate text
    console.log('\nTranslating...');
    const translated = await translateService.translate(text, {
      from: options.from,
      to: target
    });

    // Write result to clipboard
    await clipboardService.writeText(translated);

    // Show result
    console.log('\nTranslated text:');
    console.log(chalk.green(translated));
    console.log('\n' + chalk.gray('(Result has been copied to clipboard)'));
  } catch (error) {
    console.error(chalk.red('Error: Translation failed'));
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));

    // Show error notification
    notifier.notify({
      title: 'Translation Failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      type: 'error',
      sound: true
    });

    process.exit(1);
  }
} 