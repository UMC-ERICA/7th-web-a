import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { useTodoContext } from "../context/TodoContext";
import { useEffect, useState } from "react";

function TodoContainer() {
  const { todos, onAddTodo, onToggleTodo, onDeleteTodo, onEditTodo } =
    useTodoContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList
        todos={todos}
        loading={loading}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
        onEditTodo={onEditTodo}
      />
    </div>
  );
}

export default TodoContainer;
