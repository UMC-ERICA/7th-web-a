import { useContext } from 'react';
import './App.css';
import { TodoContext } from './context/TodoContext'

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
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => addTodo()} type = 'submit'>
          할 일 등록
        </button>
      </form>
      <div>
        {todos.map((todo, _) => (
          <div key={todo.id} className="todo-container">
            {/* 수정이 아닐 때 */}
            {editingId !== todo.id && (
              <div key={todo.id} className="todo-item">
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            )}
            {/*수정 중 상태일 때*/}
            {editingId === todo.id && (
              <div key={todo.id} style={{ display: 'flex', gap: '5px' }}>
                <p>{todo.id}.</p>
                <input
                  defaultValue={todo.task}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            )}
            <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>

            {/* editingId !== todo.id 수정이 아닌 상태*/}
            {/* editingId === todo.id 수정 중인 상태*/}
            {editingId === todo.id ? (
              <button onClick={() => updateTodo(editingId, editText)}>
                수정 완료
              </button>
            ) : (
              <button onClick={() => setEditingId(todo.id)}>수정 진행</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
