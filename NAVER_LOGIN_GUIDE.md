# 네이버 간편 로그인 구현 완료

## 구현된 기능

네이버 OAuth 2.0을 사용한 간편 로그인 기능이 구현되었습니다.

### 백엔드 구현
- ✅ Passport.js와 passport-naver 전략 사용
- ✅ 네이버 OAuth 인증 라우트 구현 (`/api/auth/naver`)
- ✅ 콜백 처리 및 사용자 정보 저장
- ✅ 세션 관리 구현
- ✅ 신규 사용자 자동 회원가입 처리

### 프론트엔드 구현
- ✅ 네이버 로그인 버튼에 OAuth 플로우 연결
- ✅ 로그인 콜백 페이지 생성 (`/login/callback`)
- ✅ 사용자 정보 로컬 스토리지 저장 및 이벤트 발생

### 데이터베이스 변경
- ✅ members 테이블에 네이버 로그인 관련 컬럼 추가
  - `naver_id`: 네이버 고유 ID
  - `name`: 실명
  - `nickname`: 닉네임
  - `profile_image`: 프로필 이미지 URL

## 사용 방법

### 1. 네이버 개발자 센터에서 애플리케이션 등록

1. [네이버 개발자 센터](https://developers.naver.com/apps/#/register)에 접속
2. 새 애플리케이션 등록
3. **애플리케이션 이름** 입력
4. **사용 API**에서 "네이버 로그인" 선택
5. **서비스 환경**에서 "WEB" 선택
6. **서비스 URL**: `http://localhost:3000`
7. **Callback URL**: `http://localhost:5000/api/auth/naver/callback`
8. **제공 정보**에서 필요한 항목 선택 (이메일, 이름, 프로필 이미지 등)

### 2. 환경 변수 설정

1. `.env.example` 파일을 `.env`로 복사:
   ```bash
   copy .env.example .env
   ```

2. `.env` 파일을 열어 네이버 개발자 센터에서 받은 정보로 수정:
   ```
   NAVER_CLIENT_ID=발급받은_클라이언트_아이디
   NAVER_CLIENT_SECRET=발급받은_클라이언트_시크릿
   ```

### 3. 데이터베이스 스키마 업데이트

MySQL에 접속하여 다음 SQL 파일을 실행:
```bash
mysql -u root -p your_database < db_schema_update_naver.sql
```

또는 MySQL 클라이언트에서 직접 실행:
```sql
source db_schema_update_naver.sql
```

### 4. 서버 재시작

서버를 재시작하여 변경사항을 적용:
```bash
npm run start:server
```

### 5. 테스트

1. 브라우저에서 `http://localhost:3000/login` 접속
2. "네이버로 로그인" 버튼 클릭
3. 네이버 로그인 페이지에서 로그인
4. 자동으로 홈페이지로 리다이렉트

## 주요 파일

### 백엔드
- `server/routes/auth.js` - 네이버 OAuth 인증 라우트
- `server/server.js` - Passport 및 세션 설정

### 프론트엔드
- `src/pages/login/index.js` - 로그인 페이지 (네이버 버튼 추가)
- `src/pages/login/callback.js` - OAuth 콜백 처리 페이지
- `src/App.js` - 콜백 라우트 추가

### 데이터베이스
- `db_schema_update_naver.sql` - 네이버 로그인 컬럼 추가 스크립트

### 설정
- `.env.example` - 환경 변수 예시 파일

## 인증 플로우

1. 사용자가 "네이버로 로그인" 버튼 클릭
2. 네이버 OAuth 서버로 리다이렉트
3. 사용자가 네이버에서 로그인 및 동의
4. 네이버가 Callback URL로 리다이렉트 (Authorization Code 포함)
5. 서버가 Authorization Code로 Access Token 요청
6. 서버가 Access Token으로 사용자 정보 조회
7. DB에서 네이버 ID로 사용자 검색
   - 기존 사용자: 로그인 처리
   - 신규 사용자: 자동 회원가입 후 로그인
8. 프론트엔드로 사용자 정보 전달
9. 로컬 스토리지에 저장 후 홈으로 이동

## 보안 고려사항

- ✅ Session Secret은 프로덕션 환경에서 반드시 강력한 값으로 변경
- ✅ HTTPS 사용 시 `cookie.secure: true`로 설정 (server.js)
- ✅ `.env` 파일은 `.gitignore`에 포함하여 git에 커밋하지 않도록 주의
- ✅ CORS 설정 확인 (현재 localhost:3000만 허용)

## 향후 개선 사항

- [ ] 카카오, 구글 로그인 추가
- [ ] 기존 회원과 소셜 계정 연동 기능
- [ ] 프로필 이미지 표시
- [ ] Access Token 갱신 로직
- [ ] 로그아웃 기능 강화
