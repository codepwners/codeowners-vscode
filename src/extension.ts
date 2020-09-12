import * as path from 'path';
import * as vscode from 'vscode';
import { VCSService } from './VCSService';

/**
 * Extension entry point
 * @param context vscode.ExtensionContext
 */
export async function activate(context: vscode.ExtensionContext) {
    const vcs = new VCSService();
    vscode.window.onDidChangeActiveTextEditor(async (e: vscode.TextEditor | undefined) => {
        if (e) {
            const { fsPath } = e.document.uri;
            console.log(await vcs.getVCSInfo(fsPath));
        }
    });

    if (vscode.window.activeTextEditor) {
        const { fsPath } = vscode.window.activeTextEditor.document.uri;
        console.log(await vcs.getVCSInfo(fsPath));
    }
}

/**
 * Extension destructor
 */
export function deactivate() {
    console.log('Extension "codeowners" has been deactived!');
}
