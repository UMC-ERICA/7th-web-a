import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsLoggedIn(true);
            fetchUserInfo();
        }
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            const email = response.data.email;
            const nickname = email.split('@')[0];
            setNickname(nickname);
        } catch (error) {
            console.error('유저 정보 불러오기 실패:', error);
            if (error.response && error.response.status === 401) {
                logout();
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            }
        }
    };

    const login = (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsLoggedIn(true);
        fetchUserInfo();
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        setNickname('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, nickname, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
