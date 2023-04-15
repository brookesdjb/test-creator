import FileReader from './FileReader';

const filePath = './src/sample.ts';
const fileContent = FileReader.readFile(filePath);
console.log(`Content of the file '${filePath}':\n${fileContent}`);
