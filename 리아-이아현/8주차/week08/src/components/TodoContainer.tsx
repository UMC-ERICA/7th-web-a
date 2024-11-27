import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { useAppDispatch } from "../redux/hooks";
import { addTodo } from "../redux/todoSlice";

const TodoContainer = () => {
  const dispatch = useAppDispatch();

  const onAddTodo = (title: string, content: string) => {
    dispatch(addTodo({ title, content }));
  };

  return (
    <div>
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList />
    </div>
  );
};

export default TodoContainer;
