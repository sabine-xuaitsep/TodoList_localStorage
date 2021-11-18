import { getTodoTemplate } from "./todoTemplate";
import { DB } from "../../services/DB";

export class Todo {
  constructor(data) {
    this.parent = data.parent;
    this.el = null;
    this.toggleBtn = null;
    this.contentEl = null;
    this.editEl = null;
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
    this.contentEl = this.el.querySelector("label");
    this.editEl = this.el.querySelector(".edit");
  }
  activateEl() {
    this.toggleBtn.onclick = () => {
      this.toggleCompleted();
    };
    this.el.querySelector(".destroy").onclick = () => {
      this.delete();
    };
    this.contentEl.ondblclick = () => {
      this.editContent();
    };
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
  editContent() {
    this.editEl.value = this.content;
    this.el.classList.add("editing");
    this.editEl.focus();
    this.editEl.onblur = () => {
      this.updateContent();
    };
    this.editEl.onkeyup = (e) => {
      if(e.key === "Enter") {
        this.updateContent();
      }
    };
  }
  updateContent() {
   this.content = this.editEl.value;
   DB.updateOne(this);
   this.contentEl.innerText = this.content;
   this.el.classList.remove("editing");
  }
}
