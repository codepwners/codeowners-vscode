import { TextEditor } from 'vscode';

export class TextEditorAdapter {
    private editor: TextEditor;

    constructor(editor: TextEditor) {
        this.editor = editor;
    }

    getPath(): string {
        return this.editor.document.uri.fsPath;
    }

    getLocation(): TextEditorLocationInfo {
        return {
            line: this.editor.selection.active.line,
            char: this.editor.selection.active.character,
        };
    }
}
