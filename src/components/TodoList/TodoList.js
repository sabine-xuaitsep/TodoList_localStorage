import "./todoList.css";
import { DB } from "../../services/DB";
import { getTodoListTemplate } from "./todoListTemplate";
import { Todo } from "../Todo/Todo";

export class TodoList {
  constructor(data) {
    DB.setTodos(data.todos);
    this.el = document.querySelector(data.el);
    this.todos = [];
    this.loadTodos();
  }
  loadTodos() {
    const todos = DB.findAll();
    todos.forEach((todo) => {
      this.todos.push(new Todo({ parent: this, todo }));
    });
    this.render();
  }
  render() {
    this.el.innerHTML = getTodoListTemplate();
    this.todos.forEach((todo) => {
      todo.render(this.el.querySelector(".todo-list"));
    });
  }
}
