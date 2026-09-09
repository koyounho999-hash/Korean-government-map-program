# 대한민국 임시정부 이동경로 지도 (웹앱)

1919년 상하이 수립부터 1945년 충칭까지, 대한민국 임시정부가 거쳐간 도시와 활동 장소를
지도 위에서 탐색하는 순수 HTML/CSS/JS 정적 웹앱입니다. 빌드 도구 없이 그대로
GitHub에 올리고 Vercel에 배포할 수 있습니다.

## 기능

- **지도(홈)**: 임시정부가 거쳐간 8개 도시를 태극 표식(핀)으로 표시하고, 이동 경로를 점선으로 연결
- **도시 상세**: 도시를 클릭하면 해당 도시에서 있었던 세부 활동 장소들을 다시 지도/카드로 표시
- **장소 상세**: 장소를 클릭하면 설명과 함께 **3D 뷰(스트리트뷰)** 버튼 제공
- **관련 영상 보기**: 유튜브 썸네일 카드 형태로 영상을 보여주고, 클릭 시 실제 영상 링크(유튜브 등)로 이동
  - 장소 상세 페이지 안에도 관련 영상이 함께 표시되고, 상단 메뉴의 "관련 영상 보기"에서 전체 영상 모음도 볼 수 있습니다.
- 태극기 소재(광목천 질감, 태극 문양, 4괘)를 모티프로 한 전용 디자인

## 폴더 구조

```
imsi-jeongbu-map/
├── index.html          # SPA 진입점
├── css/style.css        # 태극기 모티프 스타일
├── js/
│   ├── data.js          # 도시 / 장소 / 영상 데이터 (여기만 수정하면 콘텐츠 갱신됨)
│   ├── config.js         # (선택) 구글 지도 API 키
│   └── app.js            # 라우팅 + 렌더링 로직
├── vercel.json
└── README.md
```

## 데이터 수정하기

모든 콘텐츠는 `js/data.js` 한 곳에 있습니다.

- `IMSI_DATA.cities`: 도시 목록. 각 도시는 `locations` 배열을 가지며 장소별 좌표(`lat`,`lng`)와 설명을 넣습니다.
- `IMSI_DATA.videos`: 관련 영상 목록.
  - 유튜브 영상: `type: "youtube"`, `videoId: "영상ID"` 만 넣으면 썸네일이 자동 생성됩니다.
  - 다른 플랫폼 영상: `type: "external"`, `thumbnail: "이미지 URL"`, `link: "영상 페이지 URL"`
  - `cityId`를 지정하면 해당 도시의 장소 상세 페이지에도 함께 노출됩니다. (`null`이면 전체 공통 노출)

> ⚠️ 저장소에 포함된 영상 항목은 **예시(placeholder)** 입니다. 실제 서비스 전에 저작권이
> 확인된 실제 영상 ID/링크로 교체해 주세요.

## 3D 뷰(스트리트뷰) 설정

기본값은 API 키 없이 동작하는 구글 지도 스트리트뷰 임베드 방식을 사용합니다.
공식 Google Maps Embed API를 쓰고 싶다면 `js/config.js`에 발급받은 키를 입력하세요.

```js
const APP_CONFIG = {
  GOOGLE_MAPS_API_KEY: "여기에_발급받은_키",
};
```

(Google Cloud Console에서 "Maps Embed API"를 활성화해야 합니다.)

## 로컬에서 확인하기

빌드 과정이 없으므로 정적 파일 서버로 열기만 하면 됩니다.

```bash
npx serve .
# 또는
python3 -m http.server 5173
```

## GitHub에 올리기

```bash
cd imsi-jeongbu-map
git init
git add .
git commit -m "init: 임시정부 이동경로 지도 웹앱"
git branch -M main
git remote add origin https://github.com/<your-id>/<repo-name>.git
git push -u origin main
```

## Vercel에 배포하기

1. [vercel.com](https://vercel.com) 에서 GitHub 저장소를 Import
2. **Framework Preset**: `Other` (정적 사이트) — 별도 빌드 명령/출력 폴더 설정 불필요
3. Deploy 클릭 → 완료

또는 Vercel CLI 사용:

```bash
npm i -g vercel
vercel
```

## 참고

- 지도 타일/좌표: OpenStreetMap + Leaflet.js (무료, API 키 불필요)
- 이 웹앱의 역사 정보는 교육·전시 목적의 요약이며, 위치 좌표는 근사치입니다.
  정확한 고증은 국립대한민국임시정부기념관 등 공식 자료를 참고해 데이터를 보정해 사용하세요.
