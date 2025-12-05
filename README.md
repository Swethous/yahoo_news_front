# 📊 Yahooニュース ランキング分析ダッシュボード

🔗 **デプロイ先（React Dashboard）**  
https://news-dashboard-insight.web.app/

> 🇰🇷 한국어 버전 README: [README_ko.md](./README_ko.md)

---

## 1. 概要（Overview）

本プロジェクトは、**Yahoo!ニュース（日本）のアクセスランキングデータ**を自動収集し、  
時系列で変化する **ニューストレンド**、**コメント反応**、**滞在時間（ランキング維持時間）** を分析・可視化するために開発されました。

React ダッシュボードを利用し、誰でも直感的にトレンドを確認できます。

---

## 2. データ収集（Data Collection）

- 対象サイト: **Yahoo!ニュース アクセスランキング**
- 使用技術: **Python + BeautifulSoup**
- 収集頻度: **GitHub Actions による2時間ごとの自動実行**
- 保存先: **Supabase（PostgreSQL）**

### 収集カラム
- `crawl_datetime`
- `category`
- `rank`
- `title`
- `media`
- `publish_datetime`
- `comment_count`

---

## 3. データ前処理（Data Preprocessing）

- **UTC → JST/KST** 時刻変換  
- 重複記事や欠損値の除去  
- カテゴリ名を **日本語 / 韓国語** ラベルへマッピング  
- WordCloud 用のストップワード除去（助詞・助動詞など）  
- 週次集計  
  - **コメント数ランキング**  
  - **滞在時間ランキング（ランキング出現回数・維持時間を指標化）**

前処理後のデータを基にグラフ用の集計テーブルを生成します。

---

## 4. 可視化（Visualization）

本プロジェクトは **すべてのグラフを PNG として生成し、フロントエンドに直接表示** します。  

### 生成する可視化例
- カテゴリ別ニュース割合
- 時系列ランキング推移
- メディア別記事数 Top N
- コメント数とランキングの関係
- 月別 WordCloud
- **週次：コメント数ランキング**
- **週次：滞在時間ランキング**

作成した PNG は Supabase Storage に保存され、React ダッシュボードで表示されます。

---

## 5. 技術スタック（Tech Stack）

### Data Pipeline
- Python  
  - BeautifulSoup（スクレイピング）
  - pandas（前処理・集計）
  - Matplotlib（PNG グラフ生成）
  - WordCloud（ワードクラウド生成）
- Supabase（PostgreSQL / Storage）
- GitHub Actions（2時間ごとの自動クローリング）

### Frontend
- React + Vite
- TypeScript
- Firebase Hosting（デプロイ）

### Infra / Tools
- GitHub Actions（CI/CD & スケジューリング）
- Docker（開発環境）
- Supabase Client SDK

---

## 6. アーキテクチャ（Architecture）

```text
GitHub Actions（2時間ごと）
        ↓
Python（BeautifulSoup）でランキングデータ収集
        ↓
Supabase（PostgreSQL）に保存
        ↓
pandas + Matplotlib / WordCloud で集計 & PNG 生成
        ↓
Supabase Storage へアップロード
        ↓
React + Firebase Hosting ダッシュボードで表示
