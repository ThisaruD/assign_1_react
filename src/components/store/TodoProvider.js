import { useContext, useReducer } from "react";
import TodoContext from "./todo-context";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../config/action-keys";
import { todoActions } from "./todoActions";

const defaultTodoState = {
  todos: [],
};

export const useTodoContext = () => useContext(TodoContext);

const todoReducer = (state, action) => {
  if (action.type === ADD_TODO) {
    return {
      todos: state.todos.concat(action.todo),
    };
  }
  if (action.type === REMOVE_TODO) {
    const updatedTodos = state.todos.filter((todo) => todo.id !== action.id);

    return {
      todos: updatedTodos,
    };
  }

  if (action.type === UPDATE_TODO) {
    const updatedTodos = state.todos.map((todo) =>
      todo.id === action.id ? { ...todo, ...action.updatedTodo } : todo
    );

    return {
      todos: updatedTodos,
    };
  }
  //should return state
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
