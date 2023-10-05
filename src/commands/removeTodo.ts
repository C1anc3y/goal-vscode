import * as vscode from "vscode";
import { TodoView } from "../todoView";

export function removeTodo(id: number) {
  const todoView = new TodoView(
    vscode.extensions.getExtension("c1anc3y.goal-vscode")!.extensionUri
  );
  todoView.removeTodo(id);
}
