import { useReducer } from "react";
import TodoContext from "./todo-context";

const defaultTodoState = {
  todos: [],
};

const todoReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log("ADD");

    return {
      todos: state.todos.concat(action.todo),
    };
  }
  if (action.type === "REMOVE") {
    console.log("REMOVE");
    const updatedTodos = state.todos.filter((todo) => todo.id !== action.id);

    return {
      todos: updatedTodos,
    };
  }

  if (action.type === "UPDATE") {
    console.log("UPDATE");
    const updatedTodos = state.todos.map((todo) =>
      todo.id === action.id ? { ...todo, ...action.updatedTodo } : todo
    );

    return {
      todos: updatedTodos,
    };
  }
};

const TodoProvider = (props) => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    defaultTodoState
  );

  // const replaceTodoHandler = (todo) => {
  //   dispatchTodoAction({ type: "REPLACE", todo: todo });
  // };

  const addTodoHandler = (todo) => {
    dispatchTodoAction({ type: "ADD", todo: todo });
  };

  const removeTodoHandler = (id) => {
    dispatchTodoAction({ type: "REMOVE", id: id });
  };

  const updateTodoHandler = (updatedTodo) => {
    dispatchTodoAction({
      type: "UPDATE",
      id: updatedTodo.id,
      updatedTodo: updatedTodo,
    });
  };

  const todoContext = {
    todos: todoState.todos,
    addTodos: addTodoHandler,
    removeTodo: removeTodoHandler,
    updateTodo: updateTodoHandler,
  };

  return (
    <TodoContext.Provider value={todoContext}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
