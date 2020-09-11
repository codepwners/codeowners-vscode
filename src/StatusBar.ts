import * as vscode from 'vscode';

interface StatusBarCreateOptions {
    alignment: vscode.StatusBarAlignment;
    priority: number;
}

const defaultCreateOptions = {
    alignment: vscode.StatusBarAlignment.Right,
    priority: 0,
};

export class StatusBar {
    create(text: string, options: StatusBarCreateOptions = defaultCreateOptions): vscode.StatusBarItem {
        const item = vscode.window.createStatusBarItem(options.alignment, options.priority);
        item.text = text;

        return item;
    }
}
