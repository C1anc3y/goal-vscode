// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { TodoView } from "./todoView";
import { TodoItem } from "./todoItem";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const todoView = new TodoView(context.extensionUri);
  vscode.window.registerTreeDataProvider("goal-vscode.todoApp", todoView); // 一定要注册并绑定视图id，并且在package.json中声明

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "goal-vscode" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // let disposable = vscode.commands.registerCommand(
  //   "goal-vscode.helloWorld",
  //   () => {
  //     // The code you place here will be executed every time your command is executed
  //     // Display a message box to the user
  //     vscode.window.showInformationMessage("Hello World from goal-vscode!");
  //   }
  // );

  // context.subscriptions.push(disposable);
  context.subscriptions.push(
    vscode.commands.registerCommand("goal-vscode.addTodo", () =>
      todoView.addTodo()
    ),
    vscode.commands.registerCommand(
      "goal-vscode.removeTodo",
      (uuid: string) => todoView.removeTodo(uuid)
    ),
    vscode.commands.registerCommand(
      "goal-vscode.resetTodo",
      (uuid: string) => todoView.resetTodo(uuid)
    ),
    vscode.commands.registerCommand(
      "goal-vscode.completeTodo",
      (uuid: string) => todoView.completeTodo(uuid)
    ),
    // 为每个 TodoItem 设置上下文菜单
    vscode.commands.registerCommand(
      "goal-vscode.showContextMenu",
      (todo: TodoItem) => todoView.clickTodo(todo)
    )
  );

  todoView.initialize();
}

// This method is called when your extension is deactivated
export function deactivate() {}
