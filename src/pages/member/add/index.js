import React from "react";
import "./MemberAdd.css";

export const MemberAdd = () => {
    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">회원가입</h2>
                <form className="signup-form">
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" name="email" placeholder="example@email.com" required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" name="password" placeholder="8자 이상 입력해주세요" required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">비밀번호 확인</label>
                        <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="비밀번호를 다시 입력해주세요" required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="name">이름</label>
                        <input type="text" id="name" name="name" placeholder="홍길동" required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="gender">성별</label>
                        <select id="gender" name="gender" required>
                            <option value="">선택하세요</option>
                            <option value="male">남성</option>
                            <option value="female">여성</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="birthdate">생년월일</label>
                        <input type="date" id="birthdate" name="birthdate" required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">핸드폰번호</label>
                        <input type="tel" id="phone" name="phone" placeholder="010-1234-5678" required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="address">주소</label>
                        <input type="text" id="address" name="address" placeholder="서울특별시 강남구..." required />
                    </div>
                    
                    <button type="submit" className="signup-button">가입하기</button>
                    <a href="/login" className="login-link">이미 계정이 있으신가요? 로그인</a>
                </form>
            </div>
        </div>
    );
}