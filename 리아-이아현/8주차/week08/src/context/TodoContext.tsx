import { createContext, PropsWithChildren, useContext } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TTodo } from "../types/todo";

interface ITodoContext {
  todos: TTodo[];
  isLoading: boolean;
  isError: boolean;
  onAddTodo: (title: string, content: string) => void;
  onToggleTodo: (id: number, checked: boolean) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, title: string, content: string) => void;
}

const TodoContext = createContext<ITodoContext | null>(null);

const API_URL = "http://localhost:3000/todo";

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();

  // GET
  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data[0];
    },
  });

  // POST
  const addTodoMutation = useMutation({
    mutationFn: async ({
      title,
      content,
    }: {
      title: string;
      content: string;
    }) => {
      const response = await axios.post(API_URL, { title, content });
      return response.data;
    },
    onMutate: async ({ title, content }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<TTodo[]>(["todos"]);
      queryClient.setQueryData(["todos"], (oldTodos: TTodo[] | undefined) => [
        ...(oldTodos || []),
        {
          id: Date.now(),
          title,
          content,
          checked: false,
          createdAt: "",
          updatedAt: "",
          version: 1,
        },
      ]);
      return { previousTodos };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // DELETE
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<TTodo[]>(["todos"]);
      queryClient.setQueryData(
        ["todos"],
        (oldTodos: TTodo[] | undefined) =>
          oldTodos?.filter((todo) => todo.id !== id) || []
      );
      return { previousTodos };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // PATCH
  const editTodoMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<TTodo>;
    }) => {
      const response = await axios.patch(`${API_URL}/${id}`, updates);
      return response.data;
    },
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<TTodo[]>(["todos"]);
      queryClient.setQueryData(
        ["todos"],
        (oldTodos: TTodo[] | undefined) =>
          oldTodos?.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ) || []
      );
      return { previousTodos };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        isError,
        onAddTodo: (title, content) =>
          addTodoMutation.mutate({ title, content }),
        onDeleteTodo: (id) => deleteTodoMutation.mutate(id),
        onEditTodo: (id, title, content) =>
          editTodoMutation.mutate({ id, updates: { title, content } }),
        onToggleTodo: (id, checked) =>
          editTodoMutation.mutate({ id, updates: { checked } }),
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("TodoProvider를 찾을 수 없습니다.");
  }
  return context;
};
