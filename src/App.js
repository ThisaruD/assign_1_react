import { useContext } from "react";

import "./App.css";
import Header from "./components/common-ui-elements/header/Header";
import TodoList from './components/pages/TodoList'
import TodoPage from './components/pages/TodoPage';
import TodoProvider from "./components/store/TodoProvider";
import TodoContext from "./components/store/todo-context";
import { ErrorBoundary } from './components/pages/ErrorBoundary'


function App() {
  const todoContext = useContext(TodoContext);

  return (
    <ErrorBoundary>
      <TodoProvider>
        <Header />
        <TodoPage />
        <TodoList todos={todoContext.todos} />
      </TodoProvider>
    </ErrorBoundary>
  );
}

export default App;
