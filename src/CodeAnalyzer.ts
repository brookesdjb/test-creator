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
        ts.isArrowFunction(node)
      ) {
        const name = this.extractName(node);
        codeSections.push({ name, node });
      }
      ts.forEachChild(node, visit);
    };

    visit(this.sourceFile);
    return codeSections;
  }

  private extractName(node: ts.Node): string {
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
      return node.name ? node.name.getText(this.sourceFile) : 'Anonymous Function';
    } else if (ts.isArrowFunction(node)) {
      const variableDeclaration = node.parent as ts.VariableDeclaration;
      return variableDeclaration.name.getText(this.sourceFile);
    } else {
      return 'Unknown';
    }
  }
}

export default CodeAnalyzer;
