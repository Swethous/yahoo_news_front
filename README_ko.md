
---

## 🇰🇷 `README_ko.md` (한국어 버전)

```markdown
# 📊 Yahoo News 랭킹 트렌드 분석 프로젝트

> 🇯🇵 日本語版 README: [README.md](./README.md)

---

## 1. 개요 (Overview)

이 프로젝트는 **일본 Yahoo 뉴스의 접근 랭킹 데이터**를 자동으로 수집하여,  
시간이 지남에 따라 변하는 **뉴스 트렌드**, 그리고 **댓글 수·체류 시간 기준의 사용자 반응**을 분석·시각화하는 것을 목표로 합니다.

수집한 데이터를 통해 다음과 같은 내용을 확인할 수 있습니다.

- 카테고리별 인기 뉴스 흐름
- 댓글 수·체류 시간을 기준으로 한 “실제로 많이 읽히고, 많이 논의된 기사” 랭킹
- 주(week) 단위 트렌드 변화
- React 대시보드를 통한 직관적인 데이터 탐색

---

## 2. 데이터 수집 (Data Collection)

- 수집 대상: **Yahoo Japan 뉴스 접근 랭킹**
- 사용 기술: **Python + Selenium**
- 저장소: **Supabase(PostgreSQL)**
- 자동화 방식: **GitHub Actions (2시간 간격으로 크롤러 실행)**
- 주요 컬럼:
  - `crawl_datetime` : 크롤링 시각
  - `category` : 뉴스 카테고리 (top, domestic, world, business 등 → 일본어/한국어 라벨로 매핑)
  - `rank` : 랭킹 순위
  - `title` : 기사 제목
  - `media` : 언론사명
  - `publish_datetime` : 기사 발행 시각
  - `comment_count` : 댓글 수

---

## 3. 데이터 전처리 (Data Preprocessing)

주요 전처리 내용은 다음과 같습니다.

- 시간대 처리
  - `crawl_datetime`, `publish_datetime`를 **UTC → JST/KST** 로 변환
- 데이터 클렌징
  - 중복 레코드 제거
  - 이상치·결측치에 대한 기본적인 처리
- 카테고리명 통일 및 다국어 매핑
  - 내부적으로 관리하는 영문 카테고리를 **일본어/한국어 라벨**로 변환
- 주차(week) 단위 집계 데이터 생성
  - 일주일 단위로 기사 데이터를 묶어
    - **댓글 수 랭킹(코멘트 수 기준 Top N)**
    - **체류 타임 랭킹(랭킹 유지 시간/출현 빈도 등을 활용한 지표)**
    를 계산하는 집계 테이블 생성
- WordCloud용 텍스트 전처리
  - 일본어 조사·조동사 등 **불용어 제거**
  - URL, 특수문자, 괄호 등 노이즈 문자 제거

---

## 4. 시각화 (Visualization)

전처리된 데이터를 기반으로 Python과 React를 사용해 시각화합니다.

- Python(Matplotlib, WordCloud)로 그래프/워드클라우드 PNG 자동 생성
- 생성된 이미지는 Supabase Storage에 업로드
- React + Vite 기반 대시보드에서 이미지 및 그래프 표시

주요 시각화 내용:

- 카테고리별 기사 수 및 비율
- 시간대별 랭킹 변화 추이
- 언론사별 기사 수 Top N
- 댓글 수와 랭킹의 관계
- 월별 WordCloud (제목 키워드 기반)
- **주간 댓글 수 랭킹**
  - 일주일 동안 댓글이 많이 달린 기사 Top N을 집계·시각화
- **주간 체류 타임 랭킹**
  - 일정 기간 동안 랭킹에 오래 머문 기사/여러 번 등장한 기사 등을 기준으로  
    “오랫동안 읽힌 기사”를 주 단위로 랭킹화

---

## 5. 기술 스택 (Tech Stack)

### Data Pipeline

- Python  
  - Selenium (웹 크롤링)  
  - pandas (전처리·집계)  
  - Matplotlib / WordCloud (그래프·워드클라우드 생성)
- Supabase  
  - PostgreSQL (데이터 저장)  
  - Storage (PNG/JSON 저장)
- GitHub Actions  
  - 2시간 간격 크롤러 자동 실행 워크플로우

### Frontend

- React
- Vite
- TypeScript
- Recharts (그래프 렌더링)

### Infra / Tools

- GitHub Actions (CI/CD 및 스케줄링)
- Docker (로컬/개발 환경 컨테이너화)
- Supabase Client

---

## 6. 아키텍처 (Architecture)

```text
GitHub Actions (2시간 간격 워크플로우)
          ↓
Selenium 크롤러 (Python)
          ↓
Supabase PostgreSQL에 RAW 데이터 적재
          ↓
pandas + Matplotlib + WordCloud로 집계 및 그래프/워드클라우드 생성
          ↓
Supabase Storage에 PNG / JSON 업로드
          ↓
React + Vite 대시보드에서 시각화
