import * as vscode from "vscode";
import { TodoView } from "../todoView";

export function resetTodo(uuid: string) {
  const todoView = new TodoView(
    vscode.extensions.getExtension("c1anc3y.goal-vscode")!.extensionUri
  );
  todoView.resetTodo(uuid);
}
