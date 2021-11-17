import "./todoList.css";
import { DB } from "../../services/DB";
import { getTodoListTemplate } from "./todoListTemplate";
import { Todo } from "../Todo/Todo";

export class TodoList {
  constructor(data) {
    DB.setTodos(data.todos);
    this.el = document.querySelector(data.el);
    this.todoListEl = null;
    this.newTodoEl = null;
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
    this.catchEl();
    this.todos.forEach((todo) => {
      todo.render();
    });
    this.activateEl();
  }
  catchEl() {
    this.todoListEl = this.el.querySelector(".todo-list");
    this.newTodoEl = this.el.querySelector(".new-todo");
  }
  activateEl() {
    this.newTodoEl.onkeyup = (e) => {
      if(e.key === "Enter") {
        this.addOne();
      }
    };
  }
  addOne() {
    const todo = { 
      id: (this.todos.at(-1).id) + 1, 
      content: this.newTodoEl.value, 
      completed: false 
    };
    DB.insertOne(todo);
    const newTodo = new Todo({ parent: this, todo });
    this.todos.push(newTodo);
    newTodo.render();
    this.newTodoEl.value = "";
  }
}
