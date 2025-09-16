const vscode = require('vscode');

const PAL_MODE = { scheme: 'file', language: 'pal' };
class PalHoverProvider {
    provideHover(document, position, token) {
        let wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z0-9_+*-\/<>=!]+/);
        if (wordRange === undefined) return Promise.reject("no word here");
        let currentWord = document.lineAt(position.line).text.slice(wordRange.start.character, wordRange.end.character);
        return Promise.resolve(new vscode.Hover(currentWord));
    }
}

class PalCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        const completionItems = [
            {
                label: /[a-z]/,
                kind: vscode.CompletionItemKind.Variable
            },
            {
                label: 'set',
                kind: vscode.CompletionItemKind.Field
            },
            // 計算
            {
                label: 'sum*',
                kind: vscode.CompletionItemKind.Operator
            },
            {
                label: 'sum/',
                kind: vscode.CompletionItemKind.Operator
            },
            {
                label: 'sum+',
                kind: vscode.CompletionItemKind.Operator
            },
            {
                label: 'sum-',
                kind: vscode.CompletionItemKind.Operator
            },
            {
                label: 'inc',
                kind: vscode.CompletionItemKind.Operator
            },
            {
                label: 'dec',
                kind: vscode.CompletionItemKind.Operator
            },
            // 参照
            {
                label: 'jmp',
                kind: vscode.CompletionItemKind.Reference
            },
            {
                label: 'call',
                kind: vscode.CompletionItemKind.Reference
            },
            {
                label: 'end',
                kind: vscode.CompletionItemKind.Reference
            },
            // イベント
            {
                label: 'if=',
                kind: vscode.CompletionItemKind.Event
            },
            {
                label: 'if!=',
                kind: vscode.CompletionItemKind.Event
            },
            {
                label: 'if<',
                kind: vscode.CompletionItemKind.Event
            },
            {
                label: 'if!<',
                kind: vscode.CompletionItemKind.Event
            },
            {
                label: 'if>',
                kind: vscode.CompletionItemKind.Event
            },
            {
                label: 'if!>',
                kind: vscode.CompletionItemKind.Event
            },
            {
                label: 'if<=',
                kind: vscode.CompletionItemKind.Event
            },
            {
                label: 'if!<=',
                kind: vscode.CompletionItemKind.Event
            },
            {
                label: 'if>=',
                kind: vscode.CompletionItemKind.Event
            },
            {
                label: 'if!>=',
                kind: vscode.CompletionItemKind.Event
            },
            // メソッド
            {
                label: 'select',
                kind: vscode.CompletionItemKind.Method
            },
            {
                label: 'clone',
                kind: vscode.CompletionItemKind.Method
            },
            {
                label: 'remove',
                kind: vscode.CompletionItemKind.Method
            },
            {
                label: 'move',
                kind: vscode.CompletionItemKind.Method
            },
        ];
        let completionList = new vscode.CompletionList(completionItems, false);
        return Promise.resolve(completionList);
    }
}

function activate(context) {
    context.subscriptions.push(vscode.languages.registerHoverProvider(PAL_MODE, new PalHoverProvider()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(PAL_MODE, new PalCompletionItemProvider(), ''));
}

function deactivate() {
    return undefined;
}

module.exports = { activate, deactivate };