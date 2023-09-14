import React, { useContext, useState } from "react";

import TodoContext from "../store/todo-context";
import Modal from "../UI/Modal";
import { httpRequset } from "../../helpers/http-wrpper.helper";
import "./AddTodo.css";
import { createTodoListAPI } from "../../config/api-end-points";

const AddTodo = (props) => {
  const [enteredTodo, setEnteredTodo] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const todoContext = useContext(TodoContext);

  const addToDoHandler = async (event) => {
    event.preventDefault();
    setIsLoad(true);
    console.log(enteredTodo);
    setEnteredTodo("");

    const obj = {
      id: Math.floor(Math.random() * 100),
      activity: enteredTodo,
      status: false,
    };

    const data = await httpRequset(createTodoListAPI, "POST", [obj]);
    console.log(data);

    todoContext.addTodos(obj);
    setIsLoad(false);
    props.onClose();
  };

  if (isLoad) {
    return <p>Loading...</p>;
  }

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
