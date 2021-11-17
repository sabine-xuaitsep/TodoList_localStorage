import { getTodoTemplate } from "./todoTemplate";
import { DB } from "../../services/DB";

export class Todo {
  constructor(data) {
    this.parent = data.parent;
    this.el = null;
    this.id = data.todo.id;
    this.content = data.todo.content;
    this.completed = data.todo.completed;
  }
  render() {
    const todo = document.createElement("div");
    this.parent.todoListEl.append(todo);
    todo.outerHTML = getTodoTemplate(this);
    this.catchEl();
    this.activateEl();
  }
  catchEl() {
    this.el = this.parent.todoListEl.querySelector(`[data-id='${this.id}']`);
    this.toggleBtn = this.el.querySelector(".toggle");
  }
  activateEl() {
    this.toggleBtn.onclick = () => {
      this.toggleCompleted();
    }
    this.el.querySelector(".destroy").onclick = () => {
      this.delete();
    }
  }
  toggleCompleted() {
    this.completed = !this.completed;
    DB.updateOne(this);
    this.el.classList.toggle("completed");
    this.toggleBtn.checked = this.completed ? true : false;
    this.completed 
      ? this.toggleBtn.setAttribute("checked", "checked") 
      : this.toggleBtn.removeAttribute("checked");
    this.parent.setUncompletedCount();
  }
  delete() {
    this.el.remove();
    DB.deleteOne(this.id);
    this.parent.todos = this.parent.todos.filter((todo) => todo !== this);
    this.parent.setUncompletedCount();
  }
}
