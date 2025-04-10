#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../package.json';
import { handleLanguagesCommand } from './commands/languages';
import { handleTranslateCommand } from './commands/translate';

const program = new Command();

program
  .name('ct')
  .description('A CLI tool for translating clipboard content using DeepL API')
  .version(version);

program
  .command('translate')
  .description('Translate clipboard content to target language')
  .argument('[target]', 'Target language code (e.g., en, zh, ja)')
  .option('-f, --from <source>', 'Source language code')
  .action(handleTranslateCommand);

program
  .command('languages')
  .description('List all supported languages')
  .action(handleLanguagesCommand);

program.parse();
