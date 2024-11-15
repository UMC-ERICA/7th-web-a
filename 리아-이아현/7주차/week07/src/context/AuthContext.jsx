import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const userNickname = email.split("@")[0];
      setNickname(userNickname);
      localStorage.setItem("nickname", userNickname);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    setIsLoggedIn(false);
    setNickname("");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const storedNickname = localStorage.getItem("nickname");

    if (accessToken && storedNickname) {
      setIsLoggedIn(true);
      setNickname(storedNickname);
      fetchUserInfo(accessToken);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const email = response.data.email;
      const userNickname = email.split("@")[0];
      setNickname(userNickname);
      localStorage.setItem("nickname", userNickname);
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error);
      setIsLoggedIn(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, nickname, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
