import { useState } from "react";

import Modal from "../common-ui-elements/Modal";
import "./AddTodo.css";
import { useTodoContext } from "../store/TodoProvider";

const AddTodo = ({ onClose = () => {} }) => {
  const [enteredTodo, setEnteredTodo] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const [, todoAction] = useTodoContext();

  const addToDoHandler = (event) => {
    event.preventDefault();
    setIsLoad(true);
    console.log(enteredTodo);

    const obj = {
      id: Math.floor(Math.random() * 100),
      activity: enteredTodo,
      status: false,
    };

    todoAction.addTodoHandler(obj);
    todoAction.fetchTodoHandler();
    setIsLoad(false);
    setEnteredTodo("");
    onClose();
  };

  if (isLoad) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Modal onClose={onClose}>
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
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTodo;
