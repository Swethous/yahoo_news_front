# 📊 Yahooニュースランキング トレンド分析プロジェクト

> 🇰🇷 한국어 버전 README: [README_ko.md](./README_ko.md)

---

## 1. 概要（Overview）

本プロジェクトは、**Yahoo!ニュース（日本）のアクセスランキングデータ**を自動収集し、  
時間の経過とともに変化する **トレンド** や **コメント数／滞在時間を軸にしたユーザー反応** を分析・可視化することを目的としています。

収集したデータをもとに以下を実現します。

- カテゴリ別の人気ニュース傾向の把握  
- コメント数・滞在時間に基づく「実際に読まれた／議論された」記事のランキング  
- 週次でのトレンド変化の確認  
- React ダッシュボードによる直感的なデータ探索

---

## 2. データ収集（Data Collection）

- 収集対象: **Yahoo!ニュース アクセスランキング**
- 使用技術: **Python + Selenium**
- 保存先: **Supabase（PostgreSQL）**
- 自動化方式: **GitHub Actions（2時間ごとにクローラーを実行）**
- 収集カラム例:
  - `crawl_datetime`：クローリング日時
  - `category`：ニュースカテゴリ（トップ、国内、国際、経済、エンタメ など）
  - `rank`：ランキング順位
  - `title`：記事タイトル
  - `media`：配信元メディア
  - `publish_datetime`：記事公開日時
  - `comment_count`：コメント数

---

## 3. データ前処理（Data Preprocessing）

主な前処理内容は以下の通りです。

- 時刻情報の整理
  - `crawl_datetime` / `publish_datetime` の **UTC → JST/KST 変換**
- クレンジング
  - 重複レコードの削除
  - 不正値・欠損値の簡易処理
- カテゴリ名の統一・多言語対応
  - 内部的な英語カテゴリ名を、**日本語／韓国語ラベル** にマッピング
- 週次集計データの生成
  - 週ごとにコメント数・滞在時間を集計し、  
    **「コメント数ランキング」** と **「滞在時間ランキング」** 用のテーブルを作成
- WordCloud 用テキスト前処理
  - 日本語の助詞・助動詞などの**ストップワード除去**
  - 記号・URL・ノイズ文字の削除

---

## 4. 可視化（Visualization）

前処理済みデータをもとに、Python と React を組み合わせて可視化を行います。

- Python（Matplotlib, WordCloud）で PNG グラフ自動生成
- 生成したグラフ／ワードクラウドを Supabase Storage に保存
- React + Vite 製ダッシュボードで表示

主な可視化内容:

- カテゴリ別ニュース数・割合グラフ
- 時系列におけるランキング推移
- メディア別記事数 Top N
- コメント数とランキングの関係
- 月別 WordCloud（タイトルからキーワード抽出）
- **週次コメント数ランキング**
  - 1週間分のデータを集計し、「コメント数が多かった記事 Top N」を可視化
- **週次滞在時間ランキング**
  - 滞在時間指標（例: ランキング維持時間や一定期間内の出現回数など）を用いて  
    「長く読まれ続けた記事」を週ごとにランキング化

---

## 5. 技術スタック（Tech Stack）

### Data Pipeline

- Python  
  - Selenium（Webスクレイピング）  
  - pandas（データ整形・集計）  
  - Matplotlib / WordCloud（可視化・ワードクラウド生成）
- Supabase  
  - PostgreSQL（データ保存）  
  - Storage（グラフ画像保存）
- GitHub Actions  
  - 2時間ごとのクローラー自動実行ワークフロー

### Frontend

- React
- Vite
- TypeScript
- Recharts（グラフ描画）

### Infra / Tools

- GitHub Actions（CI/CD・スケジューラ）
- Docker（開発環境コンテナ化）
- Supabase Client

---

## 6. アーキテクチャ（Architecture）

```text
GitHub Actions（2時間ごとに実行）
          ↓
Selenium Crawler（Python）
          ↓
Supabase（PostgreSQL）に RAW データ保存
          ↓
Aggregation & Graph Generation（pandas + Matplotlib + WordCloud）
          ↓
Supabase Storage に PNG / JSON をアップロード
          ↓
React + Vite ダッシュボードで可視化
