import * as vscode from "vscode";
import { TodoList } from "./todoList";
import { TodoItem } from "./todoItem";

export class TodoView implements vscode.TreeDataProvider<TodoItem> {
  private todoList: TodoList;
  private _onDidChangeTreeData: vscode.EventEmitter<
    TodoItem | null | undefined
  > = new vscode.EventEmitter<TodoItem | null | undefined>();
  readonly onDidChangeTreeData: vscode.Event<TodoItem | null | undefined> =
    this._onDidChangeTreeData.event;

  getTreeItem(element: TodoItem): vscode.TreeItem {
    let diyLabel = `Event: ${element.text}, [id: ${
      element.id
    }, Created: ${element.createdAt.toLocaleString()}, Updated: ${element.updatedAt.toLocaleString()}]`;

    // const treeItem = new vscode.TreeItem(element.text);
    const treeItem = new vscode.TreeItem(diyLabel);

    treeItem.contextValue = "todoItem"; // 自定义上下文值以识别该项

    // 将创建时间和更新时间显示为标签文本
    // treeItem.label = `Created: ${element.createdAt.toLocaleString()}, Updated: ${element.updatedAt.toLocaleString()}`;

    treeItem.command = {
      command: "goal-vscode.showContextMenu",
      title: "Actions",
      arguments: [element],
    };

    // 设置图标等其他属性
    treeItem.iconPath = new vscode.ThemeIcon(
      element.completed ? "check" : "circle"
    );
    // 其他设置

    return treeItem;
  }

  getChildren(element?: TodoItem): Thenable<TodoItem[]> {
    if (!element) {
      return Promise.resolve(this.todoList.getTodos());
    }
    return Promise.resolve([]);
  }

  constructor(private extensionUri: vscode.Uri) {
    this.todoList = new TodoList();
  }

  initialize(): void {
    // Initialize the tree view with data or any other setup.
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(null); // Notify that the data has changed
  }

  addTodo(): void {
    vscode.window
      .showInputBox({ prompt: "Enter a new ToDo item" })
      .then((text) => {
        if (text) {
          this.todoList.addTodo(text);
          this.refresh();
        }
      });
  }

  /**
   * 移除 todoItem
   * @param id
   */
  removeTodo(id: number): void {
    this.todoList.removeTodo(id);
    this.refresh();
  }

  /**
   * 完成 todoItem
   * @param id
   */
  completeTodo(id: number): void {
    this.todoList.completeTodo(id);
    this.refresh();
  }

  /**
   * 重置 todoItem 状态
   * @param id
   */
  resetTodo(id: number): void {
    this.todoList.resetTodo(id);
    this.refresh();
  }

  /**
   * 点击 todoItem 触发相应操作
   * @param todo
   */
  clickTodo(todo: TodoItem): void {
    vscode.window
      .showQuickPick([todo.completed ? "Reset" : "Complete", "Remove"], {
        placeHolder: "Select an action",
      })
      .then((action) => {
        if (action === "Complete") {
          this.completeTodo(todo.id);
        } else if (action === "Reset") {
          this.resetTodo(todo.id);
        } else if (action === "Remove") {
          this.removeTodo(todo.id);
        }
      });
  }
}
