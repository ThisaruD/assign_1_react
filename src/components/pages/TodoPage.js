import React, { useState } from "react";
import AddTodo from "./AddTodo";
import "./TodoPage.css";

const TodoPage = () => {
  const [showAddTodo, setShowAddTodo] = useState(false);

  const addTodoHandler = () => {
    setShowAddTodo(true);
  };

  const hideFormHandler = () => {
    setShowAddTodo(false);
  };

  return (
    <div>
      <div className="my-todo-text">
        My ToDos List
        <br />
        --------------------------------------
      </div>
      <div>
        <button onClick={addTodoHandler} className="add-todo-button">
          Add Todo+
        </button>
      </div>
      {showAddTodo && <AddTodo onClose={hideFormHandler} />}
    </div>
  );
};

export default TodoPage;
