import * as deepl from 'deepl-node';
import 'dotenv/config';

export interface TranslateOptions {
  from?: string;
  to: string;
}

export interface SupportedLanguage {
  code: string;
  name: string;
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
        options.from?.toUpperCase() as deepl.SourceLanguageCode || null,
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
      const sourceLanguages = await this.client.getSourceLanguages();
      return sourceLanguages.map(lang => ({
        code: lang.code.toLowerCase(),
        name: lang.name,
      }));
    } catch (error) {
      throw new Error(`Failed to get supported languages: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 