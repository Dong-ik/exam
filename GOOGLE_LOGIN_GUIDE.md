# 구글 간편 로그인 구현 완료

## 구현된 기능

구글 OAuth 2.0을 사용한 간편 로그인 기능이 구현되었습니다.

### 백엔드 구현
- ✅ Passport.js와 passport-google-oauth20 전략 사용
- ✅ 구글 OAuth 인증 라우트 구현 (`/api/auth/google`)
- ✅ 콜백 처리 및 사용자 정보 저장
- ✅ 신규 사용자 자동 회원가입 처리

### 프론트엔드 구현
- ✅ 구글 로그인 버튼에 OAuth 플로우 연결
- ✅ 기존 로그인 콜백 페이지 재사용 (`/login/callback`)

### 데이터베이스 변경
- ✅ members 테이블에 구글 로그인 관련 컬럼 추가
  - `google_id`: 구글 고유 ID
  - `profile_image`: 프로필 이미지 URL (소셜 로그인 공통)

## 사용 방법

### 1. 구글 클라우드 콘솔에서 OAuth 클라이언트 ID 생성

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 프로젝트 선택 또는 새 프로젝트 생성
3. 좌측 메뉴에서 **API 및 서비스** > **사용자 인증 정보** 선택
4. **사용자 인증 정보 만들기** > **OAuth 클라이언트 ID** 클릭
5. 애플리케이션 유형: **웹 애플리케이션** 선택
6. 이름 입력 (예: "내 앱 웹 클라이언트")
7. **승인된 자바스크립트 원본** 추가:
   - `http://localhost:3000`
8. **승인된 리디렉션 URI** 추가:
   - `http://localhost:5000/api/auth/google/callback`
9. **만들기** 클릭
10. 생성된 **클라이언트 ID**와 **클라이언트 보안 비밀** 복사

### 2. OAuth 동의 화면 설정

1. **API 및 서비스** > **OAuth 동의 화면** 선택
2. 사용자 유형: **외부** 선택 (테스트용)
3. 앱 정보 입력:
   - 앱 이름
   - 사용자 지원 이메일
   - 개발자 연락처 정보
4. 범위 추가 (선택사항):
   - `profile` (기본 프로필 정보)
   - `email` (이메일 주소)
5. 테스트 사용자 추가 (외부 선택 시)
6. 저장 후 계속

### 3. 환경 변수 설정

`.env` 파일을 열어 구글 클라우드 콘솔에서 받은 정보로 수정:
```
GOOGLE_CLIENT_ID=발급받은_클라이언트_ID
GOOGLE_CLIENT_SECRET=발급받은_클라이언트_보안_비밀
```

### 4. 데이터베이스 스키마 업데이트

MySQL에 접속하여 다음 SQL 파일을 실행:
```bash
mysql -u root -p your_database < db_schema_updater.sql
```

또는 MySQL 클라이언트에서 직접 실행:
```sql
source db_schema_updater.sql
```

### 5. 서버 재시작

서버를 재시작하여 변경사항을 적용:
```bash
npm run start:server
```

### 6. 테스트

1. 브라우저에서 `http://localhost:3000/login` 접속
2. "구글로 로그인" 버튼 클릭
3. 구글 계정 선택 및 로그인
4. 권한 동의
5. 자동으로 홈페이지로 리다이렉트

## 주요 파일

### 백엔드
- `server/routes/auth.js` - 네이버/카카오/구글 OAuth 인증 라우트

### 프론트엔드
- `src/pages/login/index.js` - 로그인 페이지 (구글 버튼 추가)

### 데이터베이스
- `db_schema_updater.sql` - 소셜 로그인 컬럼 추가 스크립트

### 설정
- `.env.example` - 환경 변수 예시 파일

## 인증 플로우

1. 사용자가 "구글로 로그인" 버튼 클릭
2. 구글 OAuth 서버로 리다이렉트
3. 사용자가 구글 계정 선택 및 로그인
4. 권한 동의 (profile, email)
5. 구글이 Callback URL로 리다이렉트 (Authorization Code 포함)
6. 서버가 Authorization Code로 Access Token 요청
7. 서버가 Access Token으로 사용자 정보 조회
8. DB에서 구글 ID로 사용자 검색
   - 기존 사용자: 로그인 처리
   - 신규 사용자: 자동 회원가입 후 로그인
9. 프론트엔드로 사용자 정보 전달
10. 로컬 스토리지에 저장 후 홈으로 이동

## 구글 OAuth 특징

### 제공되는 정보
- **id**: 구글 고유 사용자 ID
- **emails**: 이메일 주소 배열
- **displayName**: 표시 이름
- **photos**: 프로필 사진 URL 배열
- **name**: 이름 세부 정보 (givenName, familyName)

### 필수 설정
- Client ID와 Client Secret 모두 필수
- OAuth 동의 화면 설정 필수
- 승인된 리디렉션 URI 정확히 일치해야 함
- Scope 설정: `profile`, `email` 등

### 보안
- HTTPS 권장 (프로덕션 환경)
- 클라이언트 보안 비밀은 서버에서만 사용
- 리디렉션 URI는 정확히 일치해야 함

## 소셜 로그인 비교

| 제공자 | Client Secret | 이메일 제공 | 프로필 정보 | 추가 설정 |
|--------|--------------|------------|------------|----------|
| 네이버 | 필수 | 선택적 | ✅ 이름, 프로필 이미지 | 제공 정보 선택 |
| 카카오 | 선택적 | 선택적 (동의 필요) | ✅ 닉네임, 프로필 이미지 | 동의 항목 설정 |
| 구글 | 필수 | ✅ 기본 제공 | ✅ 이름, 프로필 이미지 | OAuth 동의 화면 |

## 보안 고려사항

- ✅ Session Secret은 프로덕션 환경에서 반드시 강력한 값으로 변경
- ✅ HTTPS 사용 시 `cookie.secure: true`로 설정
- ✅ `.env` 파일은 `.gitignore`에 포함
- ✅ CORS 설정 확인 (현재 localhost:3000만 허용)
- ✅ 구글 Client Secret 안전하게 보관
- ✅ 승인된 리디렉션 URI 정확히 설정

## 현재 지원되는 소셜 로그인

- ✅ 네이버 로그인
- ✅ 카카오 로그인
- ✅ 구글 로그인

## 프로덕션 배포 시 주의사항

1. **도메인 변경**
   - 환경 변수의 모든 localhost URL을 실제 도메인으로 변경
   - 각 OAuth 제공자 콘솔에서 도메인 및 리디렉션 URI 업데이트

2. **HTTPS 적용**
   - 모든 OAuth 제공자는 프로덕션에서 HTTPS 필수
   - `cookie.secure: true` 설정

3. **OAuth 동의 화면**
   - 구글: 앱 검토 신청 또는 퍼블리싱
   - 카카오: 비즈니스 앱 등록
   - 네이버: 검수 신청

4. **환경 변수 관리**
   - 절대 Client Secret을 코드에 하드코딩하지 말 것
   - 환경별로 다른 OAuth 앱 사용 권장 (개발/스테이징/프로덕션)
