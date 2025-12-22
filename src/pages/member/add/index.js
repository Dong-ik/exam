import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberAdd.css";

export const MemberAdd = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        memberName: '',
        national: '',
        gender: '',
        birthdate: '',
        phoneAgency: '',
        phone: '',
        address: ''
    });
    const [message, setMessage] = useState('');
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
        setMessage('');
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/member/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('회원가입이 완료되었습니다!');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setError(data.error || '회원가입에 실패했습니다.');
            }
        } catch (err) {
            console.error('회원가입 오류:', err);
            setError('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">회원가입</h2>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="이메일" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="비밀번호" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="memberName" 
                            name="memberName" 
                            placeholder="이름" 
                            value={formData.memberName}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <div className="btn-group" role="group" aria-label="국적 선택">
                            <input 
                                type="radio" 
                                className="btn-check" 
                                id="nationalK" 
                                name="national" 
                                value="내국인" 
                                checked={formData.national === '내국인'}
                                onChange={handleChange}
                                autoComplete="off" 
                                required 
                            />
                            <label htmlFor="nationalK" className="btn">내국인</label> 
                            <input 
                                type="radio" 
                                className="btn-check" 
                                id="nationalF" 
                                name="national" 
                                value="외국인" 
                                checked={formData.national === '외국인'}
                                onChange={handleChange}
                                autoComplete="off" 
                            />
                            <label htmlFor="nationalF" className="btn">외국인</label>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="btn-group" role="group" aria-label="성별 선택">
                            <input 
                                type="radio" 
                                className="btn-check" 
                                id="genderM" 
                                name="gender" 
                                value="M" 
                                checked={formData.gender === 'M'}
                                onChange={handleChange}
                                autoComplete="off" 
                            />
                            <label className="btn" htmlFor="genderM">남자</label>
                            <input 
                                type="radio" 
                                className="btn-check" 
                                id="genderF" 
                                name="gender" 
                                value="F" 
                                checked={formData.gender === 'F'}
                                onChange={handleChange}
                                autoComplete="off" 
                            />
                            <label className="btn" htmlFor="genderF">여자</label>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="birthdate">생년월일</label>
                        <input 
                            type="date" 
                            id="birthdate" 
                            name="birthdate" 
                            value={formData.birthdate}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <select 
                            id="phoneAgency" 
                            name="phoneAgency" 
                            value={formData.phoneAgency}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>통신사 선택</option>
                            <option value="KT">KT</option>
                            <option value="SKT">SKT</option>
                            <option value="LG">LG U+</option>
                            <option value="KTA">KT 알뜰폰</option>
                            <option value="SKTA">SKT 알뜰폰</option>
                            <option value="LGA">LG U+ 알뜰폰</option>
                        </select>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            placeholder="휴대전화번호" 
                            value={formData.phone}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            placeholder="주소" 
                            value={formData.address}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="signup-button">가입하기</button>
                    <a href="/login" className="login-link">이미 계정이 있으신가요? 로그인</a>
                </form>
            </div>
        </div>
    );
}