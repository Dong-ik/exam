# 네이버 검색 API 설정 가이드

지도 검색 기능을 사용하려면 네이버 검색 API 키가 필요합니다.

## 1. 네이버 개발자 센터 접속
https://developers.naver.com/main/

## 2. 애플리케이션 등록
1. 상단 메뉴에서 `Application` → `애플리케이션 등록` 클릭
2. 애플리케이션 이름 입력 (예: "지도 검색 앱")
3. **사용 API** 선택:
   - ✅ **검색** 체크 (Local 검색)
4. 환경 추가:
   - WEB 설정 → 서비스 URL: `http://localhost:5000`
5. 등록 완료

## 3. API 키 확인
1. 등록한 애플리케이션 클릭
2. **Client ID**와 **Client Secret** 확인
3. `.env` 파일에 추가:

```env
NAVER_SEARCH_CLIENT_ID=발급받은_Client_ID
NAVER_SEARCH_CLIENT_SECRET=발급받은_Client_Secret
```

## 4. 서버 재시작
```bash
# 서버를 재시작해야 .env 변경사항이 적용됩니다
npm run server
```

## 검색 예시
- "스타벅스"
- "강남역 맛집"
- "서울역 카페"
- "명동 쇼핑"

## 주의사항
- 검색 API는 하루 25,000건까지 무료로 사용 가능
- 로그인 API와 검색 API는 별도의 키가 필요합니다
