import * as path from 'path';
import * as vscode from 'vscode';
import { SupportedAdapterType, VCSAdapterFactory } from './adapters/vcs/VCSAdapterFactory';
import { asyncFilter } from './AsyncUtils';
import { StatusBar } from './StatusBar';

async function isRepository(workspace: vscode.WorkspaceFolder): Promise<boolean> {
    // @todo Move the list of vcs to config
    const vcsList: VCSAdapter[] = [VCSAdapterFactory.create(SupportedAdapterType.git)];
    return (await asyncFilter(vcsList, async (vcs) => await vcs.isRepository(workspace.uri.path))).length > 0;
}

/**
 * In many cases we need to ignore extension activation.
 * For example, if git is disabled in VSCode or there are
 * no workspaces with initialized git repositories open
 */
async function shouldIgnoreActivation(): Promise<boolean> {
    if (!vscode.workspace.workspaceFolders) {
        return true;
    }

    return (await asyncFilter(vscode.workspace.workspaceFolders, isRepository)).length === 0;
}

/**
 * Extension entry point
 * @param context vscode.ExtensionContext
 */
export async function activate(context: vscode.ExtensionContext) {
    if (await shouldIgnoreActivation()) {
        return;
    }

    vscode.window.onDidChangeActiveTextEditor((e: vscode.TextEditor | undefined) => {
        if (e) {
            console.log(path.dirname(e.document.uri.fsPath));
        }
    });

    if (vscode.window.activeTextEditor) {
        const { fsPath } = vscode.window.activeTextEditor.document.uri;
        console.log(path.dirname(fsPath));
    }
}

/**
 * Extension destructor
 */
export function deactivate() {
    console.log('Extension "codeowners" has been deactived!');
}
