import ts from 'typescript';

export interface CodeSection {
    name: string;
    node: ts.Node;
  }

class CodeAnalyzer {
  private sourceFile: ts.SourceFile;

  constructor(fileContent: string) {
    this.sourceFile = ts.createSourceFile(
      'temp.ts',
      fileContent,
      ts.ScriptTarget.ES2015,
      true
    );
  }
  public analyze(): CodeSection[] {
    const codeSections: CodeSection[] = [];
    const visit = (node: ts.Node): void => {
      if (
        ts.isFunctionDeclaration(node) ||
        ts.isMethodDeclaration(node) ||
        ts.isArrowFunction(node) ||
        ts.isClassDeclaration(node)
      ) {
        const name = this.extractName(node);
        if (name) {
          codeSections.push({ name, node });
        }
      }
      ts.forEachChild(node, visit);
    };
  
    visit(this.sourceFile);
    return codeSections;
  }

  private extractName(node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.ArrowFunction | ts.ClassDeclaration): string | null {
    if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) {
      return node.name?.text || null;
    }
    if (ts.isMethodDeclaration(node)) {
      return (node.name as ts.Identifier).text;
    }
    if (ts.isArrowFunction(node)) {
      const variableDeclaration = node.parent;
      if (ts.isVariableDeclaration(variableDeclaration)) {
        return variableDeclaration.name.getText();
      }
    }
    return null;
  }
  public getClassName(node: ts.MethodDeclaration): string | null {
    const classDeclaration = node.parent;
    if (ts.isClassDeclaration(classDeclaration)) {
      return classDeclaration.name?.text || null;
    }
    return null;
  }
}

export default CodeAnalyzer;
