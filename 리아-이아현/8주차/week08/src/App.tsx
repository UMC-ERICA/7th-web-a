import styled from "styled-components";
import TodoContainer from "./components/TodoContainer";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <AppContainer>
        <StyledHeader>⚡ UMC ToDoList ⚡</StyledHeader>
        <TodoContainer />
      </AppContainer>
    </TodoProvider>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

const StyledHeader = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 50px;
  text-align: center;
`;
