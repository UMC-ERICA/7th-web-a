import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const queryClient = useQueryClient();

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token available");

    const response = await axios.get("http://localhost:3000/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const { data: userInfo, isLoading, isError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    enabled: isLoggedIn,
    onSuccess: () => {
      setIsLoggedIn(true);
    },
    onError: () => {
      logout();
    },
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setIsLoggedIn(true);
      queryClient.invalidateQueries(["userInfo"]); // 로그인 후 사용자 정보 재요청
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    queryClient.removeQueries(["userInfo"]); // 사용자 정보 캐시 삭제
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    }
  }, []);

  const nickname = userInfo ? userInfo.email.split("@")[0] : "";

  return (
    <AuthContext.Provider value={{ isLoggedIn, nickname, login, logout, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
