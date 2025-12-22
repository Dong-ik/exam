const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

// 회원가입
router.post('/signup', async (req, res) => {
  const {
    email,
    password,
    memberName,
    national,
    gender,
    birthdate,
    phoneAgency,
    phone,
    address
  } = req.body;

  try {
    // 이메일 중복 체크
    const [existingUsers] = await pool.query(
      'SELECT * FROM member WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: '이미 등록된 이메일입니다.' });
    }

    // 전화번호 중복 체크
    const [existingPhone] = await pool.query(
      'SELECT * FROM member WHERE phone = ?',
      [phone]
    );

    if (existingPhone.length > 0) {
      return res.status(400).json({ error: '이미 등록된 전화번호입니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 회원 정보 저장
    const [result] = await pool.query(
      `INSERT INTO member (email, password, member_name, national, gender, birth, phone, phone_agency, member_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, memberName, national, gender, birthdate, phone, phoneAgency, address]
    );

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      memberNum: result.insertId
    });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ error: '회원가입 중 오류가 발생했습니다.' });
  }
});

// 이메일 중복 체크
router.get('/check-email/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const [users] = await pool.query(
      'SELECT * FROM member WHERE email = ?',
      [email]
    );

    res.json({ available: users.length === 0 });
  } catch (error) {
    console.error('이메일 체크 오류:', error);
    res.status(500).json({ error: '이메일 체크 중 오류가 발생했습니다.' });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query(
      'SELECT * FROM member WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...userInfo } = user;

    res.json({
      message: '로그인 성공',
      user: userInfo
    });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
  }
});

// 회원 목록 조회
router.get('/list', async (req, res) => {
  try {
    const [members] = await pool.query(
      'SELECT member_num, email, member_name, national, gender, birth, phone, phone_agency, member_address, created_date, member_state FROM member ORDER BY created_date DESC'
    );

    res.json(members);
  } catch (error) {
    console.error('회원 목록 조회 오류:', error);
    res.status(500).json({ error: '회원 목록 조회 중 오류가 발생했습니다.' });
  }
});

// 회원 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM member WHERE member_num = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '회원을 찾을 수 없습니다.' });
    }

    res.json({ message: '회원이 삭제되었습니다.' });
  } catch (error) {
    console.error('회원 삭제 오류:', error);
    res.status(500).json({ error: '회원 삭제 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
