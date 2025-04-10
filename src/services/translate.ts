import * as deepl from 'deepl-node';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../../.env') });

export interface TranslateOptions {
  from?: string;
  to: string;
}

export interface SupportedLanguage {
  code: string;
  name: string;
  supportsFormality?: boolean;
  isSource?: boolean;
  isTarget?: boolean;
}

/**
 * Service for handling translation operations
 */
export class TranslateService {
  private client: deepl.Translator;

  constructor() {
    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey) {
      throw new Error('DEEPL_API_KEY environment variable is not set');
    }

    this.client = new deepl.Translator(apiKey);
  }

  /**
   * Translate text to target language
   * @param text Text to translate
   * @param options Translation options
   * @returns Promise<string> Translated text
   * @throws Error if translation fails
   */
  public async translate(text: string, options: TranslateOptions): Promise<string> {
    try {
      const result = await this.client.translateText(
        text,
        (options.from?.toUpperCase() || null) as deepl.SourceLanguageCode | null,
        options.to.toUpperCase() as deepl.TargetLanguageCode
      );
      return result.text;
    } catch (error) {
      throw new Error(`Translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get list of supported languages
   * @returns Promise<SupportedLanguage[]> List of supported languages
   * @throws Error if fetching languages fails
   */
  public async getSupportedLanguages(): Promise<SupportedLanguage[]> {
    try {
      // Get both source and target languages
      const [sourceLanguages, targetLanguages] = await Promise.all([
        this.client.getSourceLanguages(),
        this.client.getTargetLanguages()
      ]);

      // Create a map to store merged language information
      const languageMap = new Map<string, SupportedLanguage>();

      // Process source languages
      sourceLanguages.forEach(lang => {
        languageMap.set(lang.code.toLowerCase(), {
          code: lang.code.toLowerCase(),
          name: lang.name,
          isSource: true,
          isTarget: false
        });
      });

      // Process target languages
      targetLanguages.forEach(lang => {
        const code = lang.code.toLowerCase();
        if (languageMap.has(code)) {
          // Language exists as source, update target status
          const existing = languageMap.get(code)!;
          existing.isTarget = true;
          existing.supportsFormality = 'supportsFormality' in lang && lang.supportsFormality;
        } else {
          // New target-only language
          languageMap.set(code, {
            code,
            name: lang.name,
            isSource: false,
            isTarget: true,
            supportsFormality: 'supportsFormality' in lang && lang.supportsFormality
          });
        }
      });

      // Convert map to array and sort by code
      return Array.from(languageMap.values())
        .sort((a, b) => a.code.localeCompare(b.code));
    } catch (error) {
      throw new Error(`Failed to get supported languages: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 