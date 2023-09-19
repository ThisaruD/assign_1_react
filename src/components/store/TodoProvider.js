import { useContext, useReducer } from "react";
import TodoContext from "./todo-context";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../config/action-keys";
import { todoActions } from "./todoActions";

const defaultTodoState = {
  todos: [],
};

export const useTodoContext = () => useContext(TodoContext);

const todoReducer = (state, action) => {
  console.log(action.todo);
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: state.todos.concat(action.todo),
      };
    case REMOVE_TODO:
      var updatedTodos = state.todos.filter((todo) => todo.id !== action.id);

      return {
        todos: updatedTodos,
      };

    case UPDATE_TODO:
      var updatedTodos = state.todos.map((todo) =>
        todo.id === action.id ? { ...todo, ...action.updatedTodo } : todo
      );
      return {
        todos: updatedTodos,
      };

    default:
      var updatedTodos = state.todos;
      return {
        updatedTodos,
      };
  }
};

const TodoProvider = (props) => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    defaultTodoState
  );

  const dispatchActions = todoActions(dispatchTodoAction);

  return (
    <TodoContext.Provider value={[todoState, dispatchActions]}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
