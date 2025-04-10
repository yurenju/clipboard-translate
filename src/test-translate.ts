import { TranslateService } from './services/translate';

async function testTranslate(): Promise<void> {
  try {
    const translateService = new TranslateService();
    
    // Test getting supported languages
    console.log('Getting supported languages...');
    const languages = await translateService.getSupportedLanguages();
    console.log('Supported languages:', languages.slice(0, 5), '...');

    // Test translation
    const textToTranslate = 'Hello, world!';
    console.log(`\nTranslating text: "${textToTranslate}"`);
    
    const result = await translateService.translate(textToTranslate, {
      from: 'en',
      to: 'zh'
    });
    
    console.log('Translation result:', result);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
  }
}

testTranslate(); 