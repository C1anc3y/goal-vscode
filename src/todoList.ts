import { TodoItem } from "./todoItem";
import { v4 as uuidv4 } from "uuid";

export class TodoList {
  private todos: TodoItem[] = [];

  addTodo(text: string): TodoItem {
    const now = new Date(); // 获取当前时间
    const newTodo = new TodoItem(
      this.getNextUuId(), // 生成唯一的任务 ID，可以根据需求实现
      text,
      false,
      now, // 设置创建时间为当前时间
      now // 设置更新时间为当前时间
    );

    this.todos.push(newTodo);
    return newTodo;
  }

  getNextUuId(): string {
    let uuid = uuidv4();
    console.log(uuid); // 输出生成的 UUID，例如：'a3d3a8c5-70b3-4f61-9c62-705ae7a0c39f'

    return uuid;
  }

  removeTodo(uuid: string): void {
    const index = this.todos.findIndex((todo) => todo.uuid === uuid);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  completeTodo(uuid: string): void {
    const todo = this.todos.find((todo) => todo.uuid === uuid);
    if (todo) {
      const now = new Date(); // 获取当前时间
      todo.completed = true;
      todo.updatedAt = now;
    }
  }

  resetTodo(uuid: string): void {
    const todo = this.todos.find((todo) => todo.uuid === uuid);
    if (todo) {
      const now = new Date();
      todo.completed = false;
      todo.updatedAt = now;
    }
  }

  getTodos(): TodoItem[] {
    return this.todos;
  }
}
