import clipboard from 'clipboardy';

/**
 * Service for handling clipboard operations
 */
export class ClipboardService {
  /**
   * Read text from clipboard
   * @returns Promise<string> The text content from clipboard
   * @throws Error if reading from clipboard fails
   */
  public async readText(): Promise<string> {
    try {
      return await clipboard.read();
    } catch (error) {
      throw new Error(
        `Failed to read from clipboard: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Write text to clipboard
   * @param text The text to write to clipboard
   * @throws Error if writing to clipboard fails
   */
  public async writeText(text: string): Promise<void> {
    try {
      await clipboard.write(text);
    } catch (error) {
      throw new Error(
        `Failed to write to clipboard: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
