import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTodo } from "../types/todo";

const initialState: TTodo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string; content: string }>) => {
      const { title, content } = action.payload;
      state.push({
        id: Date.now(),
        title,
        content,
        checked: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      });
    },
    toggleTodo: (state, action: PayloadAction<{ id: number; checked: boolean }>) => {
      const { id, checked } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.checked = checked;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: number; title: string; content: string }>) => {
      const { id, title, content } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.content = content;
        todo.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
