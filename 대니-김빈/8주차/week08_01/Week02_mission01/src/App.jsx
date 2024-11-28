import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TodoList from "./pages/TodoList";
import TodoDetail from "./pages/TodoDetail";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/todo" replace />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;



