export class TodoItem {
  constructor(
    public id: number, // 标识id
    public text: string, // 文本
    public completed: boolean, // 是否完成
    public disabled: boolean, // 是否删除
    public createdAt: Date, // 创建时间
    public updatedAt: Date // 更新时间
  ) {}
}
