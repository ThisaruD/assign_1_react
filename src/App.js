import "./App.css";
import Header from "./components/common-ui-elements/header/Header";
import TodoList from "./components/pages/TodoList";
import TodoPage from "./components/pages/TodoPage";
import TodoProvider, { useTodoContext } from "./components/store/TodoProvider";
import { ErrorBoundary } from "./components/pages/ErrorBoundary";

function App() {
  const todoContext = useTodoContext();

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
