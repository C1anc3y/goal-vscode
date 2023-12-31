import * as vscode from "vscode";
import { TodoView } from "../todoView";

export function completeTodo(id: number) {
  const todoView = new TodoView(
    vscode.extensions.getExtension("c1anc3y.goal-vscode")!.extensionUri
  );
  todoView.completeTodo(id);
}
