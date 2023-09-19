import { httpRequset } from "../../helpers/http-wrpper.helper";
import {
  createTodoListAPI,
  removeTodoListAPI,
  editTodoListAPI,
  getTodoListAPI,
} from "../config/api-end-points";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../config/action-keys";

const fetchTodoHandler = async (dispatchTodoAction) => {
  const data = await httpRequset(getTodoListAPI);
  const responseData = data.items;

  const loadedTodos = [];

  for (const key in responseData) {
    console.log("print");
    loadedTodos.push({
      id: responseData[key]._uuid,
      activity: responseData[key].activity,
      status: responseData[key].status,
    });
  }
  console.log(loadedTodos);
  dispatchTodoAction({ type: ADD_TODO, todo: loadedTodos });
};

const addTodoHandler = async (todo, dispatchTodoAction) => {
  console.log("heloooooo");
  await httpRequset(createTodoListAPI, "POST", [todo]);
  dispatchTodoAction({ type: ADD_TODO, todo: todo });
};

const removeTodoHandler = async (id, dispatchTodoAction) => {
  await httpRequset(removeTodoListAPI + id, "DELETE");
  dispatchTodoAction({ type: REMOVE_TODO, id: id });
};

const updateTodoHandler = (updatedTodo, dispatchTodoAction) => {
  httpRequset(editTodoListAPI + updatedTodo.id, "PUT", {
    status: updatedTodo.status,
  });
  dispatchTodoAction({
    type: UPDATE_TODO,
    id: updatedTodo.id,
    updatedTodo: updatedTodo,
  });
};

export const todoActions = (dispatchTodoAction) => {
  return {
    fetchTodoHandler: () => fetchTodoHandler(dispatchTodoAction),
    addTodoHandler: (todo) => addTodoHandler(todo, dispatchTodoAction),
    removeTodoHandler: (id) => removeTodoHandler(id, dispatchTodoAction),
    updateTodoHandler: (updatedTodo) =>
      updateTodoHandler(updatedTodo, dispatchTodoAction),
  };
};
