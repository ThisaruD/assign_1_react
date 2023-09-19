import React, { useEffect, useState } from "react";

import TodoItem from "./includes/TodoItem";
import { httpRequset } from "../../helpers/http-wrpper.helper";
import { getTodoListAPI } from "../config/api-end-points";
import { useTodoContext } from "../store/TodoProvider";

const TodoList = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [init, setInit] = useState(false);

  const [state, todoAction] = useTodoContext();

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

      todoAction.addTodoHandler(loadedTodos);

      setIsLoad(false);
      setInit(true);
      console.log(init);
    };
    getInitData();
  }, [init]);

  const todoDeleteHandler = (id) => {
    todoAction.removeTodoHandler(id);
  };

  const todoUpdateHandler = (id) => {
    const updatedTodo = { id: id, status: true };

    todoAction.updateTodoHandler(updatedTodo);
  };

  if (isLoad) {
    return <p>Loading...</p>;
  }

  if (state.todos.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div>
      {state.todos.map((todo) => (
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
