import { TodoItem } from "./todoItem";
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

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
    saveDataToFile(this.todos);

    return newTodo;
  }

  removeTodo(id: number): void {
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
