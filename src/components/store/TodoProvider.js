import { useReducer } from "react";
import TodoContext from "./todo-context";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../config/action-keys";
import { httpRequset } from "../../helpers/http-wrpper.helper";
import {
  createTodoListAPI,
  removeTodoListAPI,
  editTodoListAPI,
} from "../config/api-end-points";

const defaultTodoState = {
  todos: [],
};

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

  //move to action file
  //ACTIONS
  const addTodoHandler = async (todo) => {
    await httpRequset(createTodoListAPI, "POST", [todo]);
    dispatchTodoAction({ type: ADD_TODO, todo: todo });
  };

  const removeTodoHandler = async (id) => {
    await httpRequset(removeTodoListAPI + id, "DELETE");
    dispatchTodoAction({ type: REMOVE_TODO, id: id });
  };

  const updateTodoHandler = (updatedTodo) => {
    httpRequset(editTodoListAPI + updatedTodo.id, "PUT", {
      status: updatedTodo.status,
    });
    dispatchTodoAction({
      type: UPDATE_TODO,
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
