import * as vscode from "vscode";
import { TodoView } from "./todoView";
import { TodoItem } from "./todoItem";

export function activate(context: vscode.ExtensionContext) {
  const todoView = new TodoView(context.extensionUri);
  vscode.window.registerTreeDataProvider(
    "c1anc3y.goal-vscode.todoApp",
    todoView
  ); // 一定要注册并绑定视图id，并且在package.json中声明

  context.subscriptions.push(
    vscode.commands.registerCommand("goal-vscode.addTodo", () =>
      todoView.addTodo()
    ),
    vscode.commands.registerCommand("goal-vscode.removeTodo", (id: number) =>
      todoView.removeTodo(id)
    ),
    vscode.commands.registerCommand("goal-vscode.resetTodo", (id: number) =>
      todoView.resetTodo(id)
    ),
    vscode.commands.registerCommand("goal-vscode.completeTodo", (id: number) =>
      todoView.completeTodo(id)
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
