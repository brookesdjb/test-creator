import fs from 'fs';

class FileReader {
  public static readFile(filePath: string): string {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return fileContent;
    } catch (error) {
      console.error(`Error reading file at ${filePath}:`, error);
      return '';
    }
  }
}

export default FileReader;
