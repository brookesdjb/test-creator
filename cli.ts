import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import TestGenerator  from './src/TestGenerator';
import CodeAnalyzer  from './src/CodeAnalyzer';
import FileReader from './src/FileReader';
import * as path from 'path';
import * as fs from 'fs';
interface CommandLineArguments {
    input: string;
    output: string;
  }
  const argv = yargs(hideBin(process.argv))
  .option('input', {
    alias: 'i',
    type: 'string',
    description: 'Input file path',
    demandOption: true,
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    description: 'Output directory path',
    default: './tests',
  })
  .help()
  .alias('help', 'h')
  .argv as CommandLineArguments;

const inputFile = path.resolve(argv.input);
const outputDir = path.resolve(argv.output);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// const fileReader = new FileReader();
const fileContent = FileReader.readFile(inputFile);

const codeAnalyzer = new CodeAnalyzer(fileContent);
const codeSections = codeAnalyzer.analyze();

const testGenerator = new TestGenerator();
const testCases = testGenerator.generateTestCases(codeSections, codeAnalyzer);

const testFileName = path.basename(inputFile, path.extname(inputFile)) + '.test.ts';
const testFilePath = path.join(outputDir, testFileName);
testGenerator.saveTestCasesToFile(testCases, inputFile, testFilePath, codeSections);

console.log(`Test file generated: ${testFilePath}`);
