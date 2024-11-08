import {useContext, useState} from 'react';
import { TodoContext } from './context/TodoContext';

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
      <input type ='text' value={text} onChange={(e) => setText(e.target.value)}/>
      <button onClick = {() => addTodo()}type ='submit'>할 일 등록</button>
    </form>
    <div>
    {todos.map((todo, _)=> (
        <div  style ={{ display: 'flex', gap: '20px'}}>
          {editingId !== todo.id && (
            <div key = {todo.id}  style ={{ display: 'flex', gap: '5px'}}>
              <p>{todo.id}</p>
              <p>{todo.task}</p>
            </div>
        )}
          {editingId === todo.id && (
            <div key = {todo.id}  style ={{ display: 'flex', gap: '5px'}}>
              <p>{todo.id}.</p>
              <input
                defaultValue={todo.task}
                onChange={(e) => setEditText(e.target.value)}>
              </input>
            </div>
          )}
        <button onClick = {() => deleteTodo(todo.id)}>삭제하기</button>
        {editingId === todo.id ?(
          <button onClick={() => updateTodo(editingId, editText)}>수정 완료</button>
        ): ( 
          <button onClick={() => setEditingId(todo.id)}>수정 진행</button>
        )}
        </div>
    ))}
    </div>
    </>
  );
}

export default App;