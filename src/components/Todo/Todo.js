import { getTodoTemplate } from "./todoTemplate";

export class Todo {
  constructor(data) {
    this.parent = data.parent;
    this.id = data.todo.id;
    this.content = data.todo.content;
    this.completed = data.todo.completed;
  }
  render(el) {
    const todo = document.createElement("div");
    el.append(todo);
    todo.outerHTML = getTodoTemplate(this);
  }
}
