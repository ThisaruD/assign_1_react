import React, { useContext, useEffect, useState } from "react";

import TodoItem from "./includes/TodoItem";
import TodoContext from "../store/todo-context";
import { httpRequset } from "../../helpers/http-wrpper.helper";
import {
  getTodoListAPI,
  removeTodoListAPI,
  editTodoListAPI,
} from "../../config/api-end-points";

const TodoList = (props) => {
  const [isLoad, setIsLoad] = useState(true);
  const [init, setInit] = useState(false);
  const todoContext = useContext(TodoContext);

  useEffect(() => {
    if (init) {
      return;
    }

    const getInitData = async () => {
      let data;
      try {
        data = await httpRequset(getTodoListAPI);
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
        todoContext.addTodos(loadedTodos);
        setIsLoad(false);
        setInit(true);
      } catch (error) {
        console.log(error);
      }
    };

    getInitData();
  }, [init, todoContext]);

  const todoDeleteHandler = (id) => {
    console.log(id);
    try {
      httpRequset(removeTodoListAPI + id, "DELETE");
      todoContext.removeTodo(id);
    } catch (error) {
      console.log(error);
    }
  };

  const todoUpdateHandler = (id) => {
    const obj = { status: true };
    try {
      httpRequset(editTodoListAPI + id, "PUT", obj);
      const updatedTodo = { id: id, status: true };
      todoContext.updateTodo(updatedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoad) {
    return <p>Loading...</p>;
  }

  if (todoContext.todos.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div>
      {todoContext.todos.map((todo) => (
        <TodoItem
          todo={todo.activity}
          id={todo.id}
          key={todo.id}
          status={todo.status}
          onDelete={todoDeleteHandler}
          onUpdate={todoUpdateHandler}
        />
      ))}
    </div>
  );
};

export default TodoList;
