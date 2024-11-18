import "./App.css";
import TodoContainer from "./components/TodoContainer";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <h1>⚡ UMC ToDoList ⚡</h1>
        <TodoContainer />
      </div>
    </TodoProvider>
  );
}

export default App;
