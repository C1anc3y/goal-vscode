# goal-vscode

先定一个小目标。

## Features

用TypeScript编写的一款简单的todoList效率小工具。

## Requirements

---

## Extension Settings

* `goal-vscode.addTodo`: 先定一个小目标.
* `goal-vscode.completeTodo`: 达成一个小目标.
* `goal-vscode.removeTodo`: 移除一个小目标.
* `goal-vscode.resetTodo`: 重置一个小目标.
* `goal-vscode.showContextMenu`: 显示每个小目标的操作项.

### 0.0.1

✅ 初始版本，暂时只支持新增任务、完成任务、重置任务状态、移除任务。且当前版本只在本地存储数据。

---

### 0.0.2

修复问题：

* VSCode重启后数据未存储。
* 不使用UUID作为todoItem标识符。

### 0.1.1

TODO: 版本功能，数据云端保存。

1. 用户根据 github/邮箱 登录，获取token标识，同步数据。
2. 根据用户常用待办信息，提取常用纬度指标，提取常用时间等，便于后续推荐。
