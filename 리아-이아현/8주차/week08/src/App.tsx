import styled from "styled-components";
import TodoContainer from "./components/TodoContainer";
import { TodoProvider } from "./context/TodoContext";
import TodoDetail from "./components/TodoDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoProvider>
        <Router>
          <AppContainer>
            <StyledHeader>⚡ UMC ToDoList ⚡</StyledHeader>
            <Routes>
              <Route path="/" element={<TodoContainer />} />
              <Route path="/todo/:id" element={<TodoDetail />} />
            </Routes>
          </AppContainer>
        </Router>
      </TodoProvider>
    </QueryClientProvider>
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
