import React from "react";

import Card from "../../UI/Card";
import { FaTrashAlt, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import "./TodoItem.css";

const TodoItem = (props) => {
  // console.log(props.todo)
  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const statusUpdateHandler = () => {
    console.log("done");
    props.onUpdate(props.id);
  };

  return (
    <ul>
      <Card>
        <div className="todo-item">
          <div className="todo-text">{props.todo}</div>
        </div>
        <button onClick={statusUpdateHandler} className="status-button">
          {props.status ? <FaRegCheckCircle /> : <FaRegCircle />}
        </button>
        <button onClick={deleteHandler} className="trash-button">
          <FaTrashAlt />
        </button>
      </Card>
    </ul>
  );
};

export default TodoItem;
