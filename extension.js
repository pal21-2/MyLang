const vscode = require('vscode');

function helloWorld() { 
    vscode.window.showInformationMessage('Hello, world!')
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('oreore.helloWorld', helloWorld));
}

function deactivate() {
    return undefined;
}

module.exports = { activate, deactivate };