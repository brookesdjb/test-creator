import ts from 'typescript';
import { CodeSection } from './CodeAnalyzer';
import CodeAnalyzer from './CodeAnalyzer';
class TestGenerator {
  public generateTestCases(codeSections: CodeSection[], codeAnalyzer: CodeAnalyzer): string {
    let testCases = '';

    codeSections.forEach((section) => {
      const functionName = section.name;
      let testCase: string;

      if (ts.isEnumDeclaration(section.node)) {
        testCase = this.generateEnumTestCase(functionName, section.node);
      } else {
        const inputScenarios = this.getInputScenarios(section.node);
        testCase = this.generateFunctionTestCases(functionName, codeAnalyzer, inputScenarios, section.node);
      }

      testCases += testCase;
    });

    return testCases;
  }





  private generateFunctionTestCases(
    functionName: string,
    codeAnalyzer: CodeAnalyzer,
    inputScenarios: any[][],
    node: ts.Node
  ): string {
    const scenarios = inputScenarios.map((inputs, index) => {
      const inputsString = inputs
        .map((input) => (typeof input === 'object' ? JSON.stringify(input) : (typeof input === 'string' ? `'${input}'` : input)))
        .join(', ');
      let methodCall: string;
      const isAsync = ts.isFunctionDeclaration(node) && node.modifiers && node.modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword);
      const uniqueId = this.generateUniqueId(6);
  
      if (ts.isClassDeclaration(node)) {
        methodCall = `const instance = new ${functionName}(${inputsString});\n    expect(instance).toBeInstanceOf(${functionName});`;
      } else if (ts.isMethodDeclaration(node)) {
        const className = codeAnalyzer.getClassName(node);
        if (className) {
          methodCall = `const instance = new ${className}();\n    expect(${isAsync ? 'await ' : ''}instance.${functionName}(${inputsString})).toBe('testOutput_${uniqueId}');`;
        } else {
          methodCall = `expect(${isAsync ? 'await ' : ''}${functionName}(${inputsString})).toBe('testOutput_${uniqueId}');`;
        }
      } else {
        methodCall = `expect(${isAsync ? 'await ' : ''}${functionName}(${inputsString})).toBe('testOutput_${uniqueId}');`;
      }
  
      return `
    it('should pass test case ${index + 1}', ${isAsync ? 'async ' : ''}() => {
      ${methodCall}
    });`;
    });
  
    return `
  describe('${functionName}', () => {
    ${scenarios.join('\n')}
    // TODO: Add more test cases for '${functionName}'
  });
  `;
}

  


  private getInputScenarios(node: ts.Node): any[][] {
    if (
      !(
        ts.isFunctionDeclaration(node) ||
        ts.isMethodDeclaration(node) ||
        ts.isArrowFunction(node)
      )
    ) {
      return [[]];
    }

    const scenarios: any[][] = [];

    node.parameters.forEach((param) => {
      const paramType = param.type;
      if (paramType) {
        if (paramType.kind === ts.SyntaxKind.NumberKeyword) {
          scenarios.push([0, 1, Number.MAX_VALUE, Number.MIN_VALUE]);
        } else if (paramType.kind === ts.SyntaxKind.StringKeyword) {
          scenarios.push(['', 'sample', 'another sample']);
        } else if (paramType.kind === ts.SyntaxKind.BooleanKeyword) {
          scenarios.push([true, false]);
        } else if (ts.isTypeReferenceNode(paramType)) {
          const typeName = paramType.typeName.getText();
          scenarios.push(this.generateObjectScenarios(typeName));
        } else if (ts.isTypeLiteralNode(paramType)) {
          scenarios.push([{}, { prop: 'value' }]);
        }
      } else {
        scenarios.push([null]);
      }
    });

    return this.generateCartesianProduct(scenarios);
  }

  private generateObjectScenarios(typeName: string): any[] {
    // Customize this function to generate input scenarios for custom types.
    switch (typeName) {
      case 'User':
        return [
          { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
          { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
        ];
      case 'Point':
        return [
          { x: 0, y: 0 },
          { x: 10, y: 20 },
        ];
      default:
        return [{}];
    }
  }

  private generateCartesianProduct(arrays: any[][]): any[][] {
    return arrays.reduce(
      (acc, array) =>
        acc.flatMap((x) => array.map((y) => x.concat(y))),
      [[]]
    );
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
      // Include enums in the imports, along with functions and classes
      if (
        ts.isFunctionDeclaration(section.node) ||
        ts.isClassDeclaration(section.node) ||
        ts.isEnumDeclaration(section.node)
      ) {
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

  private generateEnumTestCase(enumName: string, enumNode: ts.EnumDeclaration): string {
    const enumValues = enumNode.members
      .map((member) => `${enumName}.${member.name.getText()}`)
      .join(', ');

    return `
describe('${enumName}', () => {
  it('should have the expected enum values', () => {
    const expectedValues = [${enumValues}];
    expect(Object.values(${enumName})).toEqual(expectedValues);
  });

  // TODO: Add more test cases for '${enumName}'
});
`;
  }

  private generateUniqueId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

}

export default TestGenerator;
