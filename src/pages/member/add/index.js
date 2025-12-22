import React from "react";
import "./MemberAdd.css";

export const MemberAdd = () => {
    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">회원가입</h2>
                <form className="signup-form">
                    <div className="form-group">
                        <input type="email" id="email" name="email" placeholder="이메일" required />
                    </div>
                    
                    <div className="form-group">
                        <input type="password" id="password" name="password" placeholder="비밀번호" required />
                    </div>
                    
                    <div className="form-group">
                        <input type="text" id="memberName" name="memberName" placeholder="이름" required />
                    </div>

                    <div className="form-group">
                        <div className="btn-group" role="group" aria-label="국적 선택">
                            <input type="radio" className="btn-check" id="nationalK" name="national" value="내국인" autocomplete="off" required />
                            <label htmlFor="nationalK" className="btn">내국인</label> 
                            <input type="radio" className="btn-check" id="nationalF" name="national" value="외국인" autocomplete="off" />
                            <label htmlFor="nationalF" className="btn">외국인</label>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="btn-group" role="group" aria-label="성별 선택">
                            <input type="radio" className="btn-check" id="genderM" name="gender" value="M" autocomplete="off" />
                            <label className="btn" htmlFor="genderM">남자</label>
                            <input type="radio" className="btn-check" id="genderF" name="gender" value="F" autocomplete="off" />
                            <label className="btn" htmlFor="genderF">여자</label>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="birthdate">생년월일</label>
                        <input type="date" id="birthdate" name="birthdate" required />
                    </div>
                    
                    <div className="form-group">
                        <select id="phoneAgency" name="phoneAgency" required>
                            <option value="" disabled selected>통신사 선택</option>
                            <option value="KT">KT</option>
                            <option value="SKT">SKT</option>
                            <option value="LG">LG U+</option>
                            <option value="KTA">KT 알뜰폰</option>
                            <option value="SKTA">SKT 알뜰폰</option>
                            <option value="LGA">LG U+ 알뜰폰</option>
                        </select>
                        <input type="tel" id="phone" name="phone" placeholder="휴대전화번호" required />
                    </div>
                    
                    <div className="form-group">
                        <input type="text" id="address" name="address" placeholder="주소" required />
                    </div>
                    
                    <button type="submit" className="signup-button">가입하기</button>
                    <a href="/login" className="login-link">이미 계정이 있으신가요? 로그인</a>
                </form>
            </div>
        </div>
    );
}