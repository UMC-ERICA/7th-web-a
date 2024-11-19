import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { TTodo } from "../types/todo";
import axios from "axios";

interface ITodoContext {
  todos: TTodo[];
  loading: boolean;
  error: boolean;
  onAddTodo: (title: string, content: string) => void;
  onToggleTodo: (id: number, checked: boolean) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, title: string, content: string) => void;
}

const TodoContext = createContext<ITodoContext | null>(null);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("http://localhost:3000/todo")
      .then((response) => {
        const [todoList] = response.data;
        setTodos(todoList);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onAddTodo = async (title: string, content: string) => {
    try {
      setError(false);
      const response = await axios.post("http://localhost:3000/todo", {
        title,
        content,
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
      setError(true);
    }
  };

  const onToggleTodo = async (id: number, checked: boolean) => {
    try {
      setError(false);
      await axios.patch(`http://localhost:3000/todo/${id}`, { checked });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, checked } : todo))
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
      setError(true);
    }
  };

  const onDeleteTodo = async (id: number) => {
    try {
      setError(false);
      await axios.delete(`http://localhost:3000/todo/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError(true);
    }
  };

  const onEditTodo = async (id: number, title: string, content: string) => {
    try {
      setError(false);
      const updatedTodo = { title, content };
      await axios.patch(`http://localhost:3000/todo/${id}`, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        )
      );
    } catch (error) {
      console.error("Error editing todo:", error);
      setError(true);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        onAddTodo,
        onToggleTodo,
        onDeleteTodo,
        onEditTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export function useTodoContext() {
  const todos = useContext(TodoContext);
  if (todos == null) {
    throw new Error("TodoProvider를 찾을 수 없습니다.");
  }
  return todos;
}
