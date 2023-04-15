import ts from 'typescript';
import { CodeSection } from './CodeAnalyzer';
import CodeAnalyzer from './CodeAnalyzer';
class TestGenerator {
  public generateTestCases(codeSections: CodeSection[], codeAnalyzer: CodeAnalyzer): string {
    let testCases = '';
  
    codeSections.forEach((section) => {
      const functionName = section.name;
      const sampleInputs = this.generateSampleInputs(section.node);
      let methodCall: string;
  
      if (ts.isClassDeclaration(section.node)) {
        methodCall = `const instance = new ${functionName}(${sampleInputs});\n    expect(instance).toBeInstanceOf(${functionName});`;
      } else if (ts.isMethodDeclaration(section.node)) {
        const className = codeAnalyzer.getClassName(section.node);
        if (className) {
          methodCall = `const instance = new ${className}();\n    expect(instance.${functionName}(${sampleInputs})).toBe('// add expected output here//');`;
        } else {
          methodCall = `expect(${functionName}(${sampleInputs})).toBe('// add expected output here//');`;
        }
      } else {
        methodCall = `expect(${functionName}(${sampleInputs})).toBe('// add expected output here//');`;
      }
  
      const testCase = `
  describe('${functionName}', () => {
    it('should pass a sample test case', () => {
      ${methodCall}
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
private generateSampleInputs(node: ts.Node): string {
  if (
    !(
      ts.isFunctionDeclaration(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isArrowFunction(node)
    )
  ) {
    return '';
  }

  const params = node.parameters.map((param) => {
    const paramType = param.type;
    if (paramType) {
      if (paramType.kind === ts.SyntaxKind.NumberKeyword) {
        return '1';
      } else if (paramType.kind === ts.SyntaxKind.StringKeyword) {
        return "'sample'";
      } else if (paramType.kind === ts.SyntaxKind.BooleanKeyword) {
        return 'true';
      }
    }
    return 'null';
  });

  return params.join(', ');
}





}

export default TestGenerator;
