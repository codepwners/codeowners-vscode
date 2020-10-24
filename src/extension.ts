import * as vscode from 'vscode';
import { TextEditorAdapter } from './adapters/editor/TextEditorAdapter';
import { VCSService } from './VCSService';

/**
 * Extension entry point
 * @param context vscode.ExtensionContext
 */
export async function activate(context: vscode.ExtensionContext) {
    const vcs = new VCSService();

    const session = await vscode.authentication.getSession('github', [], { createIfNone: true });

    vscode.window.onDidChangeTextEditorSelection(async (e: vscode.TextEditorSelectionChangeEvent) => {
        if (e.textEditor) {
            const editorAdapter = new TextEditorAdapter(e.textEditor);
            const info = {
                vcs: await vcs.getVCSInfo(editorAdapter),
                location: editorAdapter.getLocation(),
            };
            console.log(info);
        }
    });

    if (vscode.window.activeTextEditor) {
        const editorAdapter = new TextEditorAdapter(vscode.window.activeTextEditor);
        const info = {
            vcs: await vcs.getVCSInfo(editorAdapter),
            location: editorAdapter.getLocation(),
        };
    }
}

/**
 * Extension destructor
 */
export function deactivate() {
    console.log('Extension "codeowners" has been deactived!');
}
