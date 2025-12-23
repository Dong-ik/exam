import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userParam = params.get('user');
        const error = params.get('error');

        if (error) {
            // 에러 처리
            alert('로그인에 실패했습니다.');
            navigate('/login');
            return;
        }

        if (userParam) {
            try {
                const user = JSON.parse(decodeURIComponent(userParam));
                
                // 사용자 정보를 로컬 스토리지에 저장
                localStorage.setItem('user', JSON.stringify(user));
                
                // 커스텀 이벤트 발생
                window.dispatchEvent(new Event('userLogin'));
                
                // 홈으로 이동
                navigate('/');
            } catch (err) {
                console.error('사용자 정보 파싱 오류:', err);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [location, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p>로그인 처리 중...</p>
        </div>
    );
};
