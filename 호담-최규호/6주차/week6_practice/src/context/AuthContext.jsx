import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetchUserInfo(accessToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      await fetchUserInfo(accessToken); // fetchUserInfo 완료까지 대기
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setNickname("");
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const email = response.data.email;
      const userNickname = email.split("@")[0];
      setNickname(userNickname);
      setIsLoggedIn(true); // 유저 정보가 성공적으로 불러와졌다면 로그인 상태로 설정
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, nickname, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
