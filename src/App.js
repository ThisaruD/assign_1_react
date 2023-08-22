import "./App.css";

// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/header/Header";
import TodoList from "./components/todo/TodoList";
import AddTodo from "./components/todo/AddTodo";
import { useContext, useState } from "react";
import TodoProvider from "./components/store/TodoProvider";
import TodoContext from "./components/store/todo-context";

// const dummy_todo = [
//   { id: "w1", activity: "gym", status: true },
//   { id: "w2", activity: "shopping", status: false },
//   { id: "w3", activity: "cleaning room", status: true },
// ];

function App() {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const todoContext = useContext(TodoContext);

  const addTodoHandler = () => {
    setShowAddTodo(true);
  };

  const hideFormHandler = () => {
    setShowAddTodo(false);
  };

// useEffect(()=>{
//   setIsLoad(todoContext.todos)
// },[isLoad]);

  return (
    <div className="App">
      <TodoProvider>
        <Header />
        <div className='my-todo-text'>
        My ToDos List<br/>
        --------------------------------------
        </div>
        <div>
        <button onClick={addTodoHandler} className='left-button'>Add Todo+</button>
        </div>
        {showAddTodo && <AddTodo onClose={hideFormHandler} />}
        <TodoList todos={todoContext.todos} />
        {/* {isLoad.length > 0 ? <TodoList todos={todoContext.todos} />:<p>No data</p> } */}
        
      </TodoProvider>
    </div>
  );
}

export default App;
