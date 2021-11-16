export const DB = {
  setTodos(data) {
    if (!localStorage.todos) {
      localStorage.todos = JSON.stringify(data);
    }
  },
  findAll() {
    return JSON.parse(localStorage.todos);
  }
};
