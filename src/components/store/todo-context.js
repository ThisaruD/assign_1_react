import React from "react";

const TodoContext = React.createContext({
  todos: [],
  addTodos: (todo) => {},
  removeTodo: (id) => {},
  updateTodo: (updatedTodo) => {},
});

export default TodoContext;
