import React, { useContext, useEffect, useState } from "react";

import TodoItem from "./includes/TodoItem";
import TodoContext from "../../store/todo-context";
import { httpRequset } from "../../../helpers/http-wrpper.helper";
import { getTodoListAPI } from "../../../config/api-end-points";

const TodoList = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [init, setInit] = useState(false);
  const todoContext = useContext(TodoContext);

  useEffect(() => {
    if (init) {
      return;
    }

    const getInitData = async () => {
      let data;

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
      console.log(init);
    };
    getInitData();
  }, [init, todoContext]);

  const todoDeleteHandler = (id) => {
    todoContext.removeTodo(id);
  };

  const todoUpdateHandler = (id) => {
    const updatedTodo = { id: id, status: true };
    todoContext.updateTodo(updatedTodo);
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
