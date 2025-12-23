-- 네이버/카카오/구글 간편 로그인을 위한 member 테이블 수정
-- 기존 컬럼은 유지하고 소셜 로그인 관련 컬럼만 추가

-- 소셜 로그인 관련 컬럼 추가
ALTER TABLE member 
  ADD COLUMN naver_id VARCHAR(255) NULL UNIQUE COMMENT '네이버 고유 ID',
  ADD COLUMN kakao_id VARCHAR(255) NULL UNIQUE COMMENT '카카오 고유 ID',
  ADD COLUMN google_id VARCHAR(255) NULL UNIQUE COMMENT '구글 고유 ID',
  ADD INDEX idx_naver_id (naver_id),
  ADD INDEX idx_kakao_id (kakao_id),
  ADD INDEX idx_google_id (google_id);

-- 참고: 기존 테이블이 없다면 아래 스키마를 사용하세요
/*
CREATE TABLE IF NOT EXISTS member (
  member_num INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  member_name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NULL,
  birth DATE NULL,
  gender VARCHAR(10) NULL,
  national VARCHAR(20) NULL,
  phone VARCHAR(20) NULL,
  member_address VARCHAR(255) NULL,
  created_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  member_status VARCHAR(100) NULL,
  phone_agency VARCHAR(10) NULL,
  naver_id VARCHAR(255) NULL UNIQUE,
  kakao_id VARCHAR(255) NULL UNIQUE,
  google_id VARCHAR(255) NULL UNIQUE,
  INDEX idx_email (email),
  INDEX idx_naver_id (naver_id),
  INDEX idx_kakao_id (kakao_id),
  INDEX idx_google_id (google_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
*/
