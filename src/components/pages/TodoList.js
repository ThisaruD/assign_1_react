import { useEffect, useState } from "react";

import TodoItem from "./includes/TodoItem";
import { useTodoContext } from "../store/TodoProvider";

const TodoList = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [state, todoAction] = useTodoContext();

  useEffect(() => {
    todoAction.fetchTodoHandler();
    setIsLoad(false);
  }, []);

  const todoDeleteHandler = (id) => {
    if (window.confirm("Are sure want to delete TODO?")) {
      todoAction.removeTodoHandler(id);
    }
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
