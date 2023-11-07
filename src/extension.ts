// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { stat } from 'fs';
import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;
export async function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "fileDate" is now active!');
	const myCommandId = 'fileDate.helloWorld';

	let disposable = vscode.commands.registerCommand(myCommandId, async (textEditor: vscode.TextEditor) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//let fileName= textEditor.document.fileName;
		console.log({textEditor});
		vscode.window.showInformationMessage(`Hello World from file-date!`);
		//const n = await getNumberOfSelectedLines(vscode.window.activeTextEditor);
		//vscode.window.showInformationMessage(`Yeah, ... Keep going! --> ${n}`);
	});

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = myCommandId;
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
	context.subscriptions.push(disposable);
}

function updateStatusBarItem(): void {
	const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
	if (n !== undefined) {
		myStatusBarItem.text = `time is ${n}`;
		myStatusBarItem.show();
	} else {
		myStatusBarItem.hide();
	}
}

function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): any {
	let time = new Date();
	if (editor) {
	let fileName= editor.document.fileName;
	stat(editor.document.uri.fsPath,(error, stats) => { 
			if (error) { 
				console.log(error); 
			} 
			else { 
				console.log(`Stats object for: ${fileName}`); 
				console.log(stats); 
				time = stats.birthtime;
			} 
		});
	}
	console.log({time});
	return time;
}

// This method is called when your extension is deactivated
export function deactivate() {}
