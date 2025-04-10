import { ClipboardService } from './services/clipboard';

async function testClipboard(): Promise<void> {
  try {
    const clipboardService = new ClipboardService();
    
    // Test writing to clipboard
    const textToWrite = '這是一個剪貼簿測試文字！';
    console.log(`\n寫入文字: "${textToWrite}"`);
    await clipboardService.writeText(textToWrite);
    console.log('✅ 寫入成功');
    
    // Test reading from clipboard
    console.log('\n讀取剪貼簿內容...');
    const readResult = await clipboardService.readText();
    console.log(`✅ 讀取成功: "${readResult}"`);
    
    // Verify the content matches
    if (readResult === textToWrite) {
      console.log('✅ 驗證成功：寫入和讀取的內容相符');
    } else {
      console.log('❌ 驗證失敗：寫入和讀取的內容不相符');
    }
  } catch (error) {
    console.error('❌ 錯誤:', error instanceof Error ? error.message : error);
  }
}

// 執行測試
testClipboard(); 