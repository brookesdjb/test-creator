import FileReader from './FileReader';
import CodeAnalyzer from './CodeAnalyzer';

const filePath = './src/sample.ts';
const fileContent = FileReader.readFile(filePath);

const codeAnalyzer = new CodeAnalyzer(fileContent);
const codeSections = codeAnalyzer.analyze();

console.log(`Code sections identified in the file '${filePath}':`);
codeSections.forEach((section, index) => {
  console.log(`${index + 1}. ${section.name}`);
});
