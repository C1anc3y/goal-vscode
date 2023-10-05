import { TodoItem } from "./todoItem";
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

// 读取用户配置
const config = vscode.workspace.getConfiguration("goal-vscode");
const saveOnFileSave = config.get("saveOnFileSave", false); // 默认值为 false

// 根据用户配置来决定是否自动保存文件
if (saveOnFileSave) {
  // 执行自动保存文件的逻辑
}
// // 获取用户配置文件夹的路径，如果不存在则使用默认值
// const userConfigFolder =
//   vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ||
//   path.join(__dirname, "..", "defaultUserData");

// 获取用户的配置文件夹路径
const userConfigFolder = path.join(
  // 用户的主文件夹路径
  process.env.HOME || process.env.USERPROFILE!, // 使用非空断言来告诉编译器不会为 undefined
  ".goal-vscode" // 使用你的插件名称
);
// 确保文件夹存在，如果不存在则创建
if (!fs.existsSync(userConfigFolder)) {
  fs.mkdirSync(userConfigFolder);
}

// 确定数据文件的完整路径
const dataFilePath = path.join(userConfigFolder, "todoData.json");

// 确定数据文件的完整路径
// const dataFilePath = path.join(userConfigFolder, "goal-vscode.json"); // 使用你的插件名称

// 保存数据到文件
function saveDataToFile(data: any) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error: any) {
    vscode.window.showErrorMessage(
      "Failed to save data to file: " + error.message
    );
  }
}

// 加载数据
function loadDataFromFile(): any {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error: any) {
    vscode.window.showErrorMessage(
      "Failed to load data from file: " + error.message
    );
    return null;
  }
}

// // 获取用户配置
// const config = vscode.workspace.getConfiguration("c1anc3y.goal-vscode"); // 使用你的插件名称

// // 获取已保存的待办事项数据
// const savedTodoData: TodoItem[] | undefined = config.get("todoData");

// // 初始化待办事项数据
// let todoData: TodoItem[] = savedTodoData || [];

export class TodoList {
  private todos: TodoItem[] = loadDataFromFile() || [];

  addTodo(text: string): TodoItem {
    const now = new Date(); // 获取当前时间
    const newTodo = new TodoItem(
      this.getNextId(),
      text,
      false,
      false,
      now, // 设置创建时间为当前时间
      now // 设置更新时间为当前时间
    );

    this.todos.push(newTodo);

    // config.update("todoData", this.todos, vscode.ConfigurationTarget.Global);
    saveDataToFile(this.todos);

    return newTodo;
  }

  removeTodo(id: number): void {
    // const index = this.todos.findIndex((todo) => todo.id === id);
    // if (index !== -1) {
    //   this.todos.splice(index, 1);
    // }
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.disabled = true;
      todo.updatedAt = new Date();
    }
    saveDataToFile(this.todos);
  }

  completeTodo(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = true;
      todo.updatedAt = new Date();
    }
    saveDataToFile(this.todos);
  }

  resetTodo(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = false;
      todo.disabled = false;
      todo.updatedAt = new Date();
    }
    saveDataToFile(this.todos);
  }

  getTodos(): TodoItem[] {
    // 获取未删除的数据
    return this.todos.filter((todo) => !todo.disabled);
  }

  getNextId(): number {
    const maxId = this.todos.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0
    );
    return maxId + 1;
  }
}
