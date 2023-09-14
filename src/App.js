import "./App.css";

import Header from "./components/header/Header";
import TodoList from "./components/todo/TodoList";
import AddTodo from "./components/todo/AddTodo";
import { useContext, useState } from "react";
import TodoProvider from "./components/store/TodoProvider";
import TodoContext from "./components/store/todo-context";

function App() {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const todoContext = useContext(TodoContext);

  const addTodoHandler = () => {
    setShowAddTodo(true);
  };

  const hideFormHandler = () => {
    setShowAddTodo(false);
  };

  return (
    <div className="App">
      <TodoProvider>
        <Header />
        <div className="my-todo-text">
          My ToDos List
          <br />
          --------------------------------------
        </div>
        <div>
          <button onClick={addTodoHandler} className="left-button">
            Add Todo+
          </button>
        </div>
        {showAddTodo && <AddTodo onClose={hideFormHandler} />}
        <TodoList todos={todoContext.todos} />
      </TodoProvider>
    </div>
  );
}

export default App;
