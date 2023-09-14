import { useReducer } from "react";
import TodoContext from "./todo-context";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../../config/action-keys";

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

  const addTodoHandler = (todo) => {
    dispatchTodoAction({ type: ADD_TODO, todo: todo });
  };

  const removeTodoHandler = (id) => {
    dispatchTodoAction({ type: REMOVE_TODO, id: id });
  };

  const updateTodoHandler = (updatedTodo) => {
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
