import todos from "./data";
import { TodoList } from "./components/TodoList/TodoList";

new TodoList({
  el: "#app",
  todos
});