import { useState, useEffect  } from "react";
import useCustomFetch,{ useGetData, useDebounce } from "../hooks/useCustomFetch";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
`;


const TodoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  width: 800px;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`

const Input = styled.input`
  width: 800px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 800px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
`;

const InputTitle = styled.input`
  width: 600px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextAreaContent = styled.textarea`
  padding: 10px;
  width: 600px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
`;

const Button = styled.button`
  width: 820px;
  padding: 10px 15px;
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#007bff")};
  color: ${(props) => (props.disabled ? "#666666" : "white")};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#cccccc" : "#0056b3")};
  }
`

const TodoListContainer = styled.div`
  margin-top: 20px;
  width: 780px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const TodoItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }
`;

const TodoTitle = styled.h3`
  margin: 5px ;
`;

const TodoContent = styled.p`
  margin-left: 10px;
`;

const CompleteButton = styled.button`
  width: 100px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 20px;
  height: 40px;
  margin-left: 5px;
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  flex-direction: column;
  justify-content: space-between; /* 가로로 일정 간격 유지 */
  gap: 10px; /* 요소 간의 간격 */
`;



function TodoList() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [queryTitle, setQueryTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const debouncedQueryTitle = useDebounce(queryTitle, 300);

  const { data, isLoading, isError, refetch } = useGetData(
    "/todo",
    debouncedQueryTitle ? `?title=${debouncedQueryTitle}` : "",
    false
  );

  const {
    postData: { mutate: postTodo, isLoading: isPosting, isError: postError },
    patchData: { mutate: updateTodo, isLoading: isUpdating, isError: updateError },
    deleteData: { mutate: removeTodo, isLoading: isDeleting, isError: deleteError },
  } = useCustomFetch("/todo");

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const firstItem = data[0]; // 첫 번째 항목에 접근
      console.log("첫 번째 항목:", firstItem);
  
      setTodos(
        firstItem.map((todo) => ({
          ...todo,
          isEditing: false,
          editedTitle: todo.title,
          editedContent: todo.content,
        }))
      );
    }
  }, [data]);


  

  const handleSubmit = (e) => {
    e.preventDefault();
    postTodo(
      { title, content },
      {
        onSuccess: (data) => {
          console.log("POST 성공:", data);
          setTitle("");
          setContent("");
        },
        
        onError: (error) => {
          console.error("POST 중 오류 발생:", error);
        },
        
      }
      
    );
  };

  

  const handleCheckboxChange = (id, currentChecked) => {
    const updatedChecked = !currentChecked;
  
    updateTodo(
      {
        id,
        data: { checked: updatedChecked },
      },
      {
        onSuccess: () => {
          console.log("체크박스 상태 변경 성공");

          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === id ? { ...todo, checked: updatedChecked } : todo
            )
          );
        },
        onError: (error) => {
          console.error("체크박스 상태 변경 실패:", error);
        },
      }
    );
  };
  

  const handleEditClick = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const handleDeleteClick = (id) => {
    removeTodo(id, {
      onSuccess: () => {
        console.log(`삭제 성공: ID ${id}`);
        
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      },
      onError: (error) => {
        console.error(`삭제 중 오류 발생: ${error}`);
      },
    });
  };
  

  const handleSaveClick = (id) => {
    const todoToSave = todos.find((todo) => todo.id === id);
    updateTodo(
      {
        id,
        data: {
          title: todoToSave.editedTitle,
          content: todoToSave.editedContent,
        },
      },
      {
        onSuccess: () => {
          console.log("수정 성공");

          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === id
                ? {
                    ...todo,
                    title: todoToSave.editedTitle,
                    content: todoToSave.editedContent,
                    isEditing: false,
                  }
                : todo
            )
          );
        },
        onError: (error) => {
          console.error("수정 실패:", error);
        },
      }
    );
  }
    
  

  return (
    <TodoContainer>
      <h1>Todo 작성하기</h1>
      <TodoForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          required
        />
        <Button type="submit" disabled={isPosting || !title || !content}>
          Todo 추가
        </Button>
      </TodoForm>
      {postError && <p>Todo 작성 중 오류가 발생했습니다.</p>}

      <h1>Todo 조회하기</h1>
      <TodoForm>
        <Input
          type="text"
          placeholder="제목으로 검색"
          value={queryTitle}
          onChange={(e) => setQueryTitle(e.target.value)}
        />
      </TodoForm>
      <TodoListContainer>

        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id}>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleCheckboxChange(todo.id, todo.checked)}
              />  
              {todo.isEditing ? (
                <FlexContainer>
                  <EditContainer>
                    <InputTitle
                      type="text"
                      value={todo.editedTitle}
                      onChange={(e) =>
                        setTodos((prevTodos) =>
                          prevTodos.map((t) =>
                            t.id === todo.id ? { ...t, editedTitle: e.target.value } : t
                          )
                        )
                      }
                      placeholder="제목 수정"
                    />
                    <TextAreaContent
                      value={todo.editedContent}
                      onChange={(e) =>
                        setTodos((prevTodos) =>
                          prevTodos.map((t) =>
                            t.id === todo.id ? { ...t, editedContent: e.target.value } : t
                          )
                        )
                      }
                      placeholder="내용 수정"
                      rows="3"
                    />
                  </EditContainer>
                  <CompleteButton onClick={() => handleSaveClick(todo.id)}>
                    저장
                  </CompleteButton>
                </FlexContainer>
              ) : (
                <>
                  <TodoTitle>{todo.title}</TodoTitle>
                  <Link
                    to={`/todo/${todo.id}`}>
                    상세 페이지로 이동
                  </Link>

                  <TodoContent>{todo.content}</TodoContent>
                  <CompleteButton onClick={() => handleEditClick(todo.id)}>
                    수정
                  </CompleteButton>
                  <CompleteButton onClick={() => handleDeleteClick(todo.id)}>
                    삭제
                  </CompleteButton>
                </>
              )}
            </TodoItem>
          ))
        ) : (
          <p>조회된 Todo가 없습니다.</p>
        )}
      </TodoListContainer>
    </TodoContainer>
  );
  
}

export default TodoList;
