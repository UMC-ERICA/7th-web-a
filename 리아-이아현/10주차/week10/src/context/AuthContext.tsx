import { createContext } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  nickname: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  nickname: "",
  login: async () => {
    throw new Error("로그인 에러");
  },
  logout: () => {
    throw new Error("로그아웃 에러");
  },
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
