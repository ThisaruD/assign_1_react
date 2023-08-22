import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import TodoItem from "./TodoItem";
import TodoContext from "../store/todo-context";
import Config from "../config/Config";

const TodoList = (props) => {
  //   console.log(props.todos);
  const [isLoad, setIsLoad] = useState(true);
  const [init, setInit] = useState(false);
  const [todos, setTodos] = useState([]);
  const todoContext = useContext(TodoContext);

  useEffect(() => {
    if (init) {
      return;
    }

    axios
      .get("/api/v1/task", Config)
      .then((response) => {
        console.log(response.data.items);
        const responseData = response.data.items;
        setTodos(responseData);
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
        todoContext.addTodos(loadedTodos);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoad(false);
    setInit(true);
  }, [isLoad, init]);
  // WFTT6Zjp1ZLDsgD_wA1CR8BB18s851WyIApqciLweZneUIRnUQ

  const todoDeleteHandler = (id) => {
    console.log(id);

    axios
      .delete("/api/v1/task/" + id, Config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    todoContext.removeTodo(id);
  };

  const todoUpdateHandler = (id) => {
    console.log(id);
    const obj = { status: true };
    axios
      .put("/api/v1/task/" + id, obj, Config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // todoContext.removeTodo(id);
    //const currentStatus =
    const updatedTodo = { id: id, status: true };
    todoContext.updateTodo(updatedTodo);
  };

  if (isLoad) {
    return <p>Loading</p>;
  }

  console.log(todoContext.todos);
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
