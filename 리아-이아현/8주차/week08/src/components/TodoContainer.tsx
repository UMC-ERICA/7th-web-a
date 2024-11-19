import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { useTodoContext } from "../context/TodoContext";
import Loading from "./Loading";
import Error from "./Error";

function TodoContainer() {
  const {
    todos,
    loading,
    error,
    onAddTodo,
    onToggleTodo,
    onDeleteTodo,
    onEditTodo,
  } = useTodoContext();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

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
