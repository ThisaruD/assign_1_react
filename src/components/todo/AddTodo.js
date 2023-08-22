import React, { useContext, useState } from "react";
import axios from "axios";

import TodoContext from "../store/todo-context";
import Modal from "../UI/Modal";
import Config from "../config/Config";
import "./AddTodo.css";

const AddTodo = (props) => {
  const [enteredTodo, setEnteredTodo] = useState("");

  const todoContext = useContext(TodoContext);

  const addToDoHandler = (event) => {
    event.preventDefault();
    console.log(enteredTodo);
    setEnteredTodo("");
    const obj = {
      id: Math.floor(Math.random() * 100),
      activity: enteredTodo,
      status: false,
    };
    const newObj = obj[0];
    console.log(obj[0]);
    axios
      .post("/api/v1/task", [obj], Config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    todoContext.addTodos(obj);
    props.onClose();
  };

  return (
    <div>
      <Modal onClose={props.onClose}>
        <form onSubmit={addToDoHandler}>
          <div>
            <label>Add New Todo</label>
          </div>
          <input
            id="todo"
            value={enteredTodo}
            onChange={(e) => {
              setEnteredTodo(e.target.value);
            }}
          />
          <div className="button-container">
            <button className="add-button" disabled={!enteredTodo}>
              Add
            </button>
            <button className="close-button" onClick={props.onClose}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTodo;
