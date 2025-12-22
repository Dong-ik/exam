import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 로그인 상태 확인
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        // 로컬 스토리지 변경 감지
        const handleStorageChange = () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                setUser(null);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        // 커스텀 이벤트로 같은 탭 내에서도 감지
        window.addEventListener('userLogin', handleStorageChange);
        window.addEventListener('userLogout', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userLogin', handleStorageChange);
            window.removeEventListener('userLogout', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.dispatchEvent(new Event('userLogout'));
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <header className="header">
            <h1>EXAM</h1>
            <div>
                <nav>
                    <a href="/">Home</a>
                    <a href="/map">Map</a>
                    {user ? (
                        <>
                            <span className="user-name">{user.member_name}님</span>
                            <button onClick={handleLogout} className="auth-button">로그아웃</button>
                        </>
                    ) : (
                        <button onClick={handleLogin} className="auth-button">로그인</button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;