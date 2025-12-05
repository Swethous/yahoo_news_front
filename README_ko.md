
---

# 🇰🇷 `README_ko.md`（한국어 버전）

```markdown
# 📊 Yahoo 뉴스 랭킹 분석 대시보드

🔗 **배포된 대시보드 URL**  
https://news-dashboard-insight.web.app/

> 🇯🇵 日本語版 README: [README.md](./README.md)

---

## 1. 개요 (Overview)

이 프로젝트는 **일본 Yahoo 뉴스 접근 랭킹 데이터**를 자동 수집하여  
시간 흐름에 따른 **트렌드 변화**, **댓글 기반 반응**, **체류 시간(랭킹 유지 시간)** 등을 분석하기 위해 개발되었습니다.

React 기반 대시보드에서 모든 분석 결과를 손쉽게 확인할 수 있습니다.

---

## 2. 데이터 수집 (Data Collection)

- 수집 대상: **Yahoo Japan 뉴스 랭킹**
- 사용 기술: **Python + BeautifulSoup**
- 자동화 방식: **GitHub Actions (2시간 간격 실행)**
- 저장: **Supabase (PostgreSQL)**

### 수집 컬럼
- `crawl_datetime`
- `category`
- `rank`
- `title`
- `media`
- `publish_datetime`
- `comment_count`

---

## 3. 데이터 전처리 (Data Preprocessing)

- UTC → JST/KST 시간 변환  
- 중복 제거 및 결측치 처리  
- 카테고리명 → 일본어/한국어 라벨 매핑  
- WordCloud를 위한 일본어 불용어 제거  
- 주간 집계 생성  
  - **댓글 수 랭킹**  
  - **체류 시간 랭킹 (출현 횟수·랭킹 유지시간 기반)**

---

## 4. 시각화 (Visualization)

모든 그래프는 **PNG 파일로 자동 생성**되며,  
React 프론트엔드에서는 해당 PNG 이미지를 그대로 렌더링합니다.  

### 생성되는 주요 시각화
- 카테고리별 비율 그래프
- 시계열 랭킹 변화
- 언론사별 기사 Top N
- 댓글 수 ↔ 랭킹 관계
- 월별 WordCloud
- **주간 댓글 수 랭킹**
- **주간 체류 시간 랭킹**

생성된 PNG는 Supabase Storage에 저장됩니다.

---

## 5. 기술 스택 (Tech Stack)

### Data Pipeline
- Python  
  - BeautifulSoup (스크래핑)
  - pandas (전처리·집계)
  - Matplotlib (그래프 PNG 생성)
  - WordCloud
- Supabase (PostgreSQL / Storage)
- GitHub Actions (2시간 간격 자동 실행)

### Frontend
- React + Vite  
- TypeScript  
- **Firebase Hosting (배포)**

### Infra / Tools
- GitHub Actions (CI/CD & 스케줄링)
- Docker
- Supabase Client

---

## 6. 아키텍처 (Architecture)

```text
GitHub Actions (2시간 간격)
        ↓
Python BeautifulSoup 크롤러
        ↓
Supabase PostgreSQL 저장
        ↓
Matplotlib / WordCloud → PNG 그래프 생성
        ↓
Supabase Storage 업로드
        ↓
React + Firebase Hosting 대시보드에서 표시
