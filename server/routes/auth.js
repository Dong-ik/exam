const express = require('express');
const router = express.Router();
const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../config/db');

// 네이버 Passport 설정
passport.use(new NaverStrategy({
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: process.env.NAVER_CALLBACK_URL || 'http://localhost:5000/api/auth/naver/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      console.log('네이버 프로필:', profile);
      
      // 네이버 프로필 정보 추출
      const { id, email, name, nickname } = profile._json;
      const userName = name || nickname || '네이버사용자';
      
      console.log('추출된 이름:', userName, '(name:', name, ', nickname:', nickname, ')');
      
      // DB에서 해당 네이버 ID로 사용자 조회
      const [existingUsers] = await db.query(
        'SELECT * FROM member WHERE naver_id = ?',
        [id]
      );

      if (existingUsers.length > 0) {
        // 기존 사용자 - 로그인 처리
        return done(null, existingUsers[0]);
      } else {
        // 신규 사용자 - 회원가입 처리
        // 네이버 로그인으로 가입하는 경우 기본값 설정
        const [result] = await db.query(
          `INSERT INTO member (email, member_name, naver_id, password, national, gender, birth, phone_agency, phone, member_address, created_date) 
           VALUES (?, ?, ?, '', '', '', NULL, '', NULL, '', NOW())`,
          [email || `naver_${id}@temp.com`, userName, id]
        );

        // 생성된 사용자 정보 조회
        const [newUsers] = await db.query(
          'SELECT * FROM member WHERE member_num = ?',
          [result.insertId]
        );

        return done(null, newUsers[0]);
      }
    } catch (error) {
      console.error('네이버 인증 오류:', error);
      return done(error);
    }
  }
));

// 카카오 Passport 설정
passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    //clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: process.env.KAKAO_CALLBACK_URL || 'http://localhost:5000/api/auth/kakao/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      console.log('카카오 프로필:', profile);
      
      // 카카오 프로필 정보 추출
      const { id } = profile;
      const email = profile._json.kakao_account?.email;
      const nickname = profile._json.properties?.nickname;
      
      // DB에서 해당 카카오 ID로 사용자 조회
      const [existingUsers] = await db.query(
        'SELECT * FROM member WHERE kakao_id = ?',
        [id]
      );

      if (existingUsers.length > 0) {
        // 기존 사용자 - 로그인 처리
        return done(null, existingUsers[0]);
      } else {
        // 신규 사용자 - 회원가입 처리
        const [result] = await db.query(
          `INSERT INTO member (email, member_name, kakao_id, password, national, gender, birth, phone_agency, phone, member_address, created_date) 
           VALUES (?, ?, ?, '', '', '', NULL, '', '', '', NOW())`,
          [email || `kakao_${id}@temp.com`, nickname || '카카오사용자', id]
        );

        // 생성된 사용자 정보 조회
        const [newUsers] = await db.query(
          'SELECT * FROM member WHERE member_num = ?',
          [result.insertId]
        );

        return done(null, newUsers[0]);
      }
    } catch (error) {
      console.error('카카오 인증 오류:', error);
      return done(error);
    }
  }
));

// 구글 Passport 설정
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      console.log('구글 프로필:', profile);
      
      // 구글 프로필 정보 추출
      const { id, emails, displayName } = profile;
      const email = emails && emails[0] ? emails[0].value : null;
      
      // DB에서 해당 구글 ID로 사용자 조회
      const [existingUsers] = await db.query(
        'SELECT * FROM member WHERE google_id = ?',
        [id]
      );

      if (existingUsers.length > 0) {
        // 기존 사용자 - 로그인 처리
        return done(null, existingUsers[0]);
      } else {
        // 신규 사용자 - 회원가입 처리
        const [result] = await db.query(
          `INSERT INTO member (email, member_name, google_id, password, national, gender, birth, phone_agency, phone, member_address, created_date) 
           VALUES (?, ?, ?, '', '', '', NULL, '', NULL, '', NOW())`,
          [email || `google_${id}@temp.com`, displayName || '구글사용자', id]
        );

        // 생성된 사용자 정보 조회
        const [newUsers] = await db.query(
          'SELECT * FROM member WHERE member_num = ?',
          [result.insertId]
        );

        return done(null, newUsers[0]);
      }
    } catch (error) {
      console.error('구글 인증 오류:', error);
      return done(error);
    }
  }
));

// 세션 직렬화
passport.serializeUser((user, done) => {
  done(null, user.member_num);
});

// 세션 역직렬화
passport.deserializeUser(async (member_num, done) => {
  try {
    const [users] = await db.query('SELECT * FROM member WHERE member_num = ?', [member_num]);
    done(null, users[0]);
  } catch (error) {
    done(error);
  }
});

// 네이버 로그인 시작
router.get('/naver', passport.authenticate('naver'));

// 네이버 로그인 콜백
router.get('/naver/callback',
  passport.authenticate('naver', { 
    failureRedirect: 'http://localhost:3000/login?error=naver_auth_failed' 
  }),
  (req, res) => {
    // 로그인 성공
    const user = {
      id: req.user.member_num,
      email: req.user.email,
      member_name: req.user.member_name
    };
    
    // 프론트엔드로 리다이렉트하면서 사용자 정보 전달
    const userEncoded = encodeURIComponent(JSON.stringify(user));
    res.redirect(`http://localhost:3000/login/callback?user=${userEncoded}`);
  }
);

// 카카오 로그인 시작
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 로그인 콜백
router.get('/kakao/callback',
  passport.authenticate('kakao', { 
    failureRedirect: 'http://localhost:3000/login?error=kakao_auth_failed' 
  }),
  (req, res) => {
    // 로그인 성공
    const user = {
      id: req.user.member_num,
      email: req.user.email,
      member_name: req.user.member_name
    };
    
    // 프론트엔드로 리다이렉트하면서 사용자 정보 전달
    const userEncoded = encodeURIComponent(JSON.stringify(user));
    res.redirect(`http://localhost:3000/login/callback?user=${userEncoded}`);
  }
);

// 구글 로그인 시작
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// 구글 로그인 콜백
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:3000/login?error=google_auth_failed' 
  }),
  (req, res) => {
    // 로그인 성공
    const user = {
      id: req.user.member_num,
      email: req.user.email,
      member_name: req.user.member_name
    };
    
    // 프론트엔드로 리다이렉트하면서 사용자 정보 전달
    const userEncoded = encodeURIComponent(JSON.stringify(user));
    res.redirect(`http://localhost:3000/login/callback?user=${userEncoded}`);
  }
);

// 로그아웃
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: '로그아웃 실패' });
    }
    res.json({ message: '로그아웃 성공' });
  });
});

// 현재 사용자 정보 조회
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: '인증되지 않음' });
  }
});

module.exports = router;
