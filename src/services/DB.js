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
        if(todo.completed !== data.completed) {
          todo.completed = data.completed;
        }
        if(todo.content !== data.content) {
          todo.content = data.content;
        }
      }
    });
    localStorage.todos = JSON.stringify(todos);
  },
  deleteOne(id) {
    let todos = JSON.parse(localStorage.todos);
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.todos = JSON.stringify(todos);
  }
};
