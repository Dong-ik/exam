import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/member/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // 로그인 성공 - 사용자 정보를 로컬 스토리지에 저장
                localStorage.setItem('user', JSON.stringify(data.user));
                // 커스텀 이벤트 발생
                window.dispatchEvent(new Event('userLogin'));
                // 홈으로 이동
                navigate('/');
            } else {
                setError(data.error || '로그인에 실패했습니다.');
            }
        } catch (err) {
            console.error('로그인 오류:', err);
            setError('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">로그인</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="input-group">
                    <label htmlFor="email">이메일</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="password">비밀번호</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="login-button">로그인</button>
                    <a href="/member/add" className="signup-link">회원가입</a>
                </form>
                {/* 소셜 로그인 버튼 영역 */}
                <div className="social-buttons">
                    <button className="social-button naver">
                        <img src="https://static.nid.naver.com/oauth/small_g_in.PNG" alt="네이버" width={24} height={24} />
                        네이버로 로그인
                    </button>
                    <button className="social-button kakao">
                        <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" alt="카카오" width={24} height={24} />
                        카카오로 로그인
                    </button>
                    <button className="social-button google">
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="구글" width={24} height={24} />
                        구글로 로그인
                    </button>
                </div>
            </div>
        </div>
    );
}