import React from "react";

import Card from "../../../common-ui-elements/Card";
import { FaTrashAlt, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import "./TodoItem.css";

const TodoItem = ({onDelete,onUpdate, id,todo,status}) => {
  // console.log(props.todo)
  const deleteHandler = () => {
    onDelete(id);
  };

  const statusUpdateHandler = () => {
    console.log("done");
    onUpdate(id);
  };

  return (
    <ul>
      <Card>
        <div className="todo-item">
          <div className="todo-text">{todo}</div>
        </div>
        <button onClick={statusUpdateHandler} className="status-button">
          {status ? <FaRegCheckCircle /> : <FaRegCircle />}
        </button>
        <button onClick={deleteHandler} className="trash-button">
          <FaTrashAlt />
        </button>
      </Card>
    </ul>
  );
};

export default TodoItem;
