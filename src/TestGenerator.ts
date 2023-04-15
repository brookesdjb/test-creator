import ts from 'typescript';
import { CodeSection } from './CodeAnalyzer';

class TestGenerator {
  public generateTestCases(codeSections: CodeSection[]): string {
    let testCases = '';

    codeSections.forEach((section) => {
      const functionName = section.name;
      const testCase = `
describe('${functionName}', () => {
  it('should pass a sample test case', () => {
    expect(true).toBe(true);
  });

  // TODO: Add more test cases for '${functionName}'
});
`;
      testCases += testCase;
    });

    return testCases;
  }

public saveTestCasesToFile(testCases: string, sourceFilePath: string, outputFilePath: string, codeSections: CodeSection[]): void {
  const imports = this.extractExports(codeSections).join(', ');
  const fileHeader = `
import { ${imports} } from './${this.getRelativeImportPath(sourceFilePath, outputFilePath)}';

/* eslint-disable @typescript-eslint/no-unused-vars */
`;
  const fileContent = fileHeader + testCases;
  require('fs').writeFileSync(outputFilePath, fileContent, 'utf-8');
}

private extractExports(codeSections: CodeSection[]): string[] {
  const exports: string[] = [];
  codeSections.forEach((section) => {
    // Only include top-level functions and classes in the imports
    if (ts.isFunctionDeclaration(section.node) || ts.isClassDeclaration(section.node)) {
      exports.push(section.name);
    }
  });
  return exports;
}

private getRelativeImportPath(sourceFilePath: string, outputFilePath: string): string {
  const sourceDir = require('path').dirname(sourceFilePath);
  const outputDir = require('path').dirname(outputFilePath);
  const relativePath = require('path').relative(outputDir, sourceDir);
  const sourceFileBaseName = require('path').basename(sourceFilePath, '.ts');
  const importPath = require('path').join(relativePath, sourceFileBaseName);
  return importPath.replace(/\\/g, '/');
}

}

export default TestGenerator;
