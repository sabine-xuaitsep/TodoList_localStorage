import "./todoList.css";
import { DB } from "../../services/DB";
import { Todo } from "../Todo/Todo";
import { getTodoListTemplate } from "./todoListTemplate";

export class TodoList {
  constructor(data) {
    DB.setTodos(data.todos);
    this.el = document.querySelector(data.el);
    this.todoListEl = null;
    this.newTodoEl = null;
    this.clearCompletedBtn = null;
    this.filterLinks = null;
    this.selectedFilter = null;
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
    this.isHiddenSection();
    this.isHiddenBtn();
    this.setUncompletedCount();
    this.activateEl();
  }
  catchEl() {
    this.todoListEl = this.el.querySelector(".todo-list");
    this.newTodoEl = this.el.querySelector(".new-todo");
    this.clearCompletedBtn = this.el.querySelector(".clear-completed");
    this.filterLinks = this.el.querySelectorAll(".filters li a");
  }
  activateEl() {
    this.newTodoEl.onkeyup = (e) => {
      if(e.key === "Enter") {
        if(this.newTodoEl.value !== "") {
          this.addOne();
        }
      }
    };
    this.clearCompletedBtn.onclick = () => {
      this.deleteCompleted();
    };
    this.el.querySelector(".toggle-all").onclick = () => {
      this.completeAll();
    };
    this.filterLinks.forEach((filter) => {
      filter.onclick = (e) => {
        e.preventDefault();
        this.filter(filter);
      };
    });
  }
  isHiddenSection() {
    this.el.querySelector(".main").style.display =
      this.todos.length === 0 ? "none" : "block";
    this.el.querySelector(".footer").style.display =
      this.todos.length === 0 ? "none" : "block";
  }
  isHiddenBtn() {
    this.clearCompletedBtn.style.display = 
      this.todos.some((todo) => todo.completed) ? "block" : "none";
  }
  setUncompletedCount() {
    const uncompletedCount = this.todos.filter((todo) => !todo.completed).length;
    this.el.querySelector(".todo-count").innerHTML = `
      <strong>${uncompletedCount}</strong> 
      item${uncompletedCount !== 1 ? "s": ""} left
      `;
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
    this.isHiddenSection();
    this.setUncompletedCount();
  }
  deleteCompleted() {
    this.todos.forEach((todo) => {
      if(todo.completed) {
        todo.delete();
      }
    });
  }
  completeAll() {
    this.todos.forEach((todo) => {
      if(!todo.completed) {
        todo.toggleCompleted();
      }
    });
  }
  filter(el) {
    this.selectedFilter = el.href.split("#/")[1];
    this.todos.forEach((todo) => {
      switch (this.selectedFilter) {
        case "active":
          todo.el.style.display = !todo.completed ? "block" : "none";
          break;
        case "completed":
          todo.el.style.display = todo.completed ? "block" : "none";
          break;
        default:
          todo.el.style.display = "block";
          break;
      }
    });
    this.filterLinks.forEach((filter) => {
      filter === el
        ? filter.classList.add("selected")
        : filter.classList.remove("selected");
    });
  }
}
