export class TodoList {
  constructor(data) {
    this.el = document.querySelector(data.el);
    this.el.innerHTML = "TodoList soon";
  }
}