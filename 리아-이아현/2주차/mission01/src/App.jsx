import { useContext } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import { TodoContext } from "./context/TodoContext";

function App() {
  const {
    todos,
    text,
    setText,
    editingId,
    setEditingId,
    editText,
    setEditText,
    handleSubmit,
    addTodo,
    deleteTodo,
    updateTodo,
  } = useContext(TodoContext);

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <Input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="submitInput"
        />
        <Button
          onClick={addTodo}
          buttonText="할 일 등록"
          type="submit"
          className="submitButton"
        />
      </form>
      <div className="todos-container">
        {todos.map((todo, _) => (
          <div key={todo.id} className="todo-item">
            {/*수정이 아닐 때 */}
            {editingId !== todo.id && (
              <div key={todo.id} className="todo-item">
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            )}
            {/*수정 중일 때 */}
            {editingId === todo.id && (
              <div key={todo.id} className="todo-item">
                <p>{todo.id}.</p>
                <Input
                  defaultValue={todo.task}
                  onChange={(e) => setEditText(e.target.value)}
                  className="editInput"
                />
              </div>
            )}

            <Button
              onClick={() => deleteTodo(todo.id)}
              buttonText="삭제하기"
              className="deleteButton"
            />
            {/* editingId !== todo.id 수정이 아닌 상태 */}
            {editingId === todo.id ? (
              <Button
                onClick={() => updateTodo(editingId, editText)}
                buttonText="수정 완료"
                className="completeButton"
              />
            ) : (
              <Button
                onClick={() => setEditingId(todo.id)}
                buttonText="수정 진행"
                className="updateButton"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
