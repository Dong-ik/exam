import React from "react";
import "./Login.css";

export const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">로그인</h2>
                <div className="input-group">
                    <label htmlFor="userEmail">이메일</label>
                    <input type="email" id="userEmail" name="userEmail" />
                    <label htmlFor="userPassword">비밀번호</label>
                    <input type="password" id="userPassword" name="userPassword" />
                    <button className="login-button">로그인</button>
                    <a href="/member/add" className="signup-link">회원가입</a>
                </div>
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