export const DB = {
  setTodos(data) {
    if (!localStorage.todos) {
      localStorage.todos = JSON.stringify(data);
    }
  },
  findAll() {
    return JSON.parse(localStorage.todos);
  },
  insertOne(data) {
    const todos = JSON.parse(localStorage.todos);
    todos.push(data);
    localStorage.todos = JSON.stringify(todos);
  },
  updateOne(data) {
    const todos = JSON.parse(localStorage.todos);
    todos.forEach((todo) => {
      if(todo.id === data.id) {
        todo.completed = data.completed;
      }
    });
    localStorage.todos = JSON.stringify(todos);
  }
};
