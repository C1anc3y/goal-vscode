import * as vscode from "vscode";
import { TodoView } from "../todoView";

export function resetTodo(id: number) {
  const todoView = new TodoView(
    vscode.extensions.getExtension("c1anc3y.goal-vscode")!.extensionUri
  );
  todoView.resetTodo(id);
}
