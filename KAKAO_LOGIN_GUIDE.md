# 카카오 간편 로그인 구현 완료

## 구현된 기능

카카오 OAuth 2.0을 사용한 간편 로그인 기능이 구현되었습니다.

### 백엔드 구현
- ✅ Passport.js와 passport-kakao 전략 사용
- ✅ 카카오 OAuth 인증 라우트 구현 (`/api/auth/kakao`)
- ✅ 콜백 처리 및 사용자 정보 저장
- ✅ 신규 사용자 자동 회원가입 처리

### 프론트엔드 구현
- ✅ 카카오 로그인 버튼에 OAuth 플로우 연결
- ✅ 기존 로그인 콜백 페이지 재사용 (`/login/callback`)

### 데이터베이스 변경
- ✅ members 테이블에 카카오 로그인 관련 컬럼 추가
  - `kakao_id`: 카카오 고유 ID
  - `profile_image`: 프로필 이미지 URL (네이버와 공유)

## 사용 방법

### 1. 카카오 개발자 센터에서 애플리케이션 등록

1. [카카오 개발자 센터](https://developers.kakao.com/console/app)에 접속
2. "애플리케이션 추가하기" 클릭
3. **앱 이름**, **사업자명** 입력하고 저장
4. 생성된 앱 선택 → **앱 키** 메뉴에서 **REST API 키** 복사
5. **플랫폼** 메뉴에서 "Web 플랫폼 등록" 클릭
   - **사이트 도메인**: `http://localhost:3000`
6. **카카오 로그인** 메뉴에서 "활성화 설정" ON
7. **Redirect URI** 등록: `http://localhost:5000/api/auth/kakao/callback`
8. **동의항목** 메뉴에서 필요한 항목 설정
   - 닉네임 (필수)
   - 프로필 사진 (선택)
   - 카카오계정(이메일) (선택)
9. **보안** 메뉴에서 Client Secret 발급 (선택사항)
   - "코드 생성" 클릭
   - "활성화" 상태로 변경

### 2. 환경 변수 설정

`.env` 파일을 열어 카카오 개발자 센터에서 받은 정보로 수정:
```
KAKAO_CLIENT_ID=발급받은_REST_API_키
KAKAO_CLIENT_SECRET=발급받은_Client_Secret (선택사항)
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
2. "카카오로 로그인" 버튼 클릭
3. 카카오 로그인 페이지에서 로그인
4. 동의 화면에서 동의
5. 자동으로 홈페이지로 리다이렉트

## 주요 파일

### 백엔드
- `server/routes/auth.js` - 네이버/카카오 OAuth 인증 라우트

### 프론트엔드
- `src/pages/login/index.js` - 로그인 페이지 (카카오 버튼 추가)

### 데이터베이스
- `db_schema_update_naver.sql` - 네이버/카카오 로그인 컬럼 추가 스크립트

### 설정
- `.env.example` - 환경 변수 예시 파일

## 인증 플로우

1. 사용자가 "카카오로 로그인" 버튼 클릭
2. 카카오 OAuth 서버로 리다이렉트
3. 사용자가 카카오에서 로그인 및 동의
4. 카카오가 Callback URL로 리다이렉트 (Authorization Code 포함)
5. 서버가 Authorization Code로 Access Token 요청
6. 서버가 Access Token으로 사용자 정보 조회
7. DB에서 카카오 ID로 사용자 검색
   - 기존 사용자: 로그인 처리
   - 신규 사용자: 자동 회원가입 후 로그인
8. 프론트엔드로 사용자 정보 전달
9. 로컬 스토리지에 저장 후 홈으로 이동

## 카카오 vs 네이버 차이점

### 카카오
- Client Secret은 선택사항 (보안 강화를 위해 권장)
- 이메일 제공이 선택사항 (사용자가 동의해야 제공)
- 닉네임 기본 제공
- 프로필 정보는 `properties` 객체에 포함

### 네이버
- Client Secret 필수
- 이메일, 이름 등 제공 정보 설정
- 프로필 정보는 `_json` 객체에 바로 포함

## 보안 고려사항

- ✅ Session Secret은 프로덕션 환경에서 반드시 강력한 값으로 변경
- ✅ HTTPS 사용 시 `cookie.secure: true`로 설정
- ✅ `.env` 파일은 `.gitignore`에 포함
- ✅ CORS 설정 확인 (현재 localhost:3000만 허용)
- ✅ 카카오 Client Secret 사용 권장

## 현재 지원되는 소셜 로그인

- ✅ 네이버 로그인
- ✅ 카카오 로그인
- ⬜ 구글 로그인 (향후 추가 예정)
