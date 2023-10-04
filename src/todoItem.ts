export class TodoItem {
  constructor(
    public uuid: string,
    public text: string,
    public completed: boolean,
    public createdAt: Date, // 创建时间
    public updatedAt: Date // 更新时间
  ) {}
}
