import { createContext } from 'react';
//데이터를 담고 있다
export const TodoContext = createContext;

//우산을 만들었다
export function TodoContextProvider({ children }){
    return<TodoContext.Provider>{children}</TodoContext.Provider>
}
