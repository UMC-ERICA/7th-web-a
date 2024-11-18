import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { useTodoContext } from "../context/TodoContext";

function TodoContainer() {
  const { todos, onAddTodo, onToggleTodo, onDeleteTodo, onEditTodo } =
    useTodoContext();

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
