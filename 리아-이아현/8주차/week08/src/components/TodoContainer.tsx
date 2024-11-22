import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { useTodoContext } from "../context/TodoContext";
import Loading from "./Loading";
import Error from "./Error";

function TodoContainer() {
  const {
    todos,
    isLoading,
    isError,
    onAddTodo,
    onToggleTodo,
    onDeleteTodo,
    onEditTodo,
  } = useTodoContext();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div>
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList
        todos={todos}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
        onEditTodo={onEditTodo}
      />
    </div>
  );
}

export default TodoContainer;
