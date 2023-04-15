import FileReader from './FileReader';
import CodeAnalyzer from './CodeAnalyzer';
import TestGenerator from './TestGenerator';

const filePath = './src/sample.ts';
const fileContent = FileReader.readFile(filePath);

const codeAnalyzer = new CodeAnalyzer(fileContent);
const codeSections = codeAnalyzer.analyze();

const testGenerator = new TestGenerator();
const testCases = testGenerator.generateTestCases(codeSections);
console.log(`Generated test cases for the file '${filePath}':\n${testCases}`);

const outputFilePath = './src/sample.test.ts';
testGenerator.saveTestCasesToFile(testCases, outputFilePath);
console.log(`Test cases saved to '${outputFilePath}'.`);
