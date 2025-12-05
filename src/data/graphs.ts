// src/data/graphs.ts

export type Section =
  | "overview"
  | "week_ranking"
  | "media"
  | "rank_comment"
  | "wordcloud"
  | "timeseries";

export type Language = "ja" | "ko";

export type GraphItem = {
  id: string;
  section: Section;
  lang?: Language; // 없어도 되게 ? 로
  title: string;
  subtitle?: string;
  description?: string;
  img: string;
};

const BASE_URL = import.meta.env.VITE_SUPABASE_GRAPH_BASE_URL as string;
const url = (filename: string) => `${BASE_URL}${filename}`;

export const GRAPHS: GraphItem[] = [
  // 여분
  {
    id: "category_comment_boxplot_jp",
    section: "rank_comment",
    lang: "ja",
    title: "カテゴリ別 コメント数の分布",
    subtitle: "日本語ラベル版",
    description: "カテゴリ別のコメント数の分布を示すボックスプロットです。",
    img: url("dist_category_comment_boxplot_latest_jp.png"),
  },
  {
    id: "category_comment_boxplot_ko",
    section: "rank_comment",
    lang: "ko",
    title: "카테고리별 댓글 수 분포",
    subtitle: "한국어 라벨",
    description: "카테고리별 댓글 수 분포를 나타낸 박스플롯입니다.",
    img: url("dist_category_comment_boxplot_latest_ko.png"),
  },

  // 2) 댓글 수 분포 히스토그램
  {
    id: "comment_hist_jp",
    section: "rank_comment",
    lang: "ja",
    title: "コメント数の分布",
    subtitle: "日本語ラベル版",
    description: "全ニュースのコメント数分布を表すヒストグラムです。",
    img: url("dist_comment_hist_latest_jp.png"),
  },
  {
    id: "comment_hist_ko",
    section: "rank_comment",
    lang: "ko",
    title: "댓글 수 분포",
    subtitle: "한국어 라벨",
    description: "전체 뉴스의 댓글 수 분포를 나타낸 히스토그램입니다.",
    img: url("dist_comment_hist_latest_ko.png"),
  },


  // 4) 랭킹별 댓글 수 분포
  {
    id: "rank_vs_comment_jp",
    section: "rank_comment",
    lang: "ja",
    title: "ランキング別 コメント数の分布",
    subtitle: "日本語ラベル版",
    description: "ランキング順位ごとのコメント数分布を示す散布図です。",
    img: url("dist_rank_vs_comment_latest_jp.png"),
  },
  {
    id: "rank_vs_comment_ko",
    section: "rank_comment",
    lang: "ko",
    title: "랭킹별 댓글 수 분포",
    subtitle: "한국어 라벨",
    description: "랭킹 순위별 댓글 수 분포를 시각화한 산점도입니다.",
    img: url("dist_rank_vs_comment_latest_ko.png"),
  },
  // ===============================
  // メディア / 언론사 분석 (view 섹션)
  // ===============================
  {
    id: "media_article_count_in_top_jp",
    section: "media",
    lang: "ja",
    title: "総合TOPカテゴリ内 メディア別記事数（上位15社）",
    subtitle: "日本語ラベル版",
    description: "総合TOPカテゴリにおけるメディア別の記事数の上位15社を示した棒グラフです。",
    img: url("media_article_count_in_top_latest_jp.png"),
  },
  {
    id: "media_article_count_in_top_ko",
    section: "media",
    lang: "ko",
    title: "종합 TOP 카테고리 내 언론사별 기사 수 (상위 15개)",
    subtitle: "한국어 라벨",
    description: "종합 TOP 카테고리에서 언론사별 기사 수 상위 15개를 보여주는 막대 그래프입니다.",
    img: url("media_article_count_in_top_latest_ko.png"),
  },

  {
    id: "media_avg_comment_topN_jp",
    section: "media",
    lang: "ja",
    title: "メディア別 平均コメント数 TOP10",
    subtitle: "日本語ラベル版",
    description: "メディアごとの平均コメント数が高い上位10社を示したグラフです。",
    img: url("media_avg_comment_topN_latest_jp.png"),
  },
  {
    id: "media_avg_comment_topN_ko",
    section: "media",
    lang: "ko",
    title: "언론사별 평균 댓글 수 TOP10",
    subtitle: "한국어 라벨",
    description: "언론사별 평균 댓글 수가 높은 상위 10곳을 보여주는 그래프입니다.",
    img: url("media_avg_comment_topN_latest_ko.png"),
  },

  {
    id: "media_count_by_category_topN_jp",
    section: "media",
    lang: "ja",
    title: "カテゴリ別 メディア登場回数 TOP5",
    subtitle: "日本語ラベル版",
    description: "カテゴリごとにメディアが登場した回数の上位5社を並べたマルチプロットです。",
    img: url("media_count_by_category_topN_latest_jp.png"),
  },
  {
    id: "media_count_by_category_topN_ko",
    section: "media",
    lang: "ko",
    title: "카테고리별 언론사 등장 횟수 TOP5",
    subtitle: "한국어 라벨",
    description: "카테고리별로 언론사가 얼마나 자주 등장했는지 상위 5개를 보여주는 멀티 플롯입니다.",
    img: url("media_count_by_category_topN_latest_ko.png"),
  },
  // ----------------------
  // Rank & Comment Section
  // ----------------------

  {
    id: "rank_category_avg_comment_jp",
    section: "rank_comment",
    lang: "ja",
    title: "カテゴリ別 平均コメント数",
    subtitle: "日本語ラベル版",
    description: "各カテゴリの平均コメント数を比較した棒グラフです。",
    img: url("rank_category_avg_comment_latest_jp.png"),
  },
  {
    id: "rank_category_avg_comment_ko",
    section: "rank_comment",
    lang: "ko",
    title: "카테고리별 평균 댓글 수",
    subtitle: "한국어 라벨",
    description: "각 카테고리의 평균 댓글 수를 비교한 막대 그래프입니다.",
    img: url("rank_category_avg_comment_latest_ko.png"),
  },

  {
    id: "rank_engagement_summary_jp",
    section: "rank_comment",
    lang: "ja",
    title: "閲覧ベースTOP比率 vs コメントベース参加度",
    subtitle: "バブルサイズ＝平均ランキング",
    description: "閲覧数ベースのTOP比率とコメントベース参加度の関係を示したバブルチャートです。",
    img: url("rank_engagement_summary_latest_jp.png"),
  },
  {
    id: "rank_engagement_summary_ko",
    section: "rank_comment",
    lang: "ko",
    title: "조회수 기반 TOP 비율 vs 댓글 기반 참여도",
    subtitle: "버블 크기 = 평균 랭킹",
    description: "조회수 TOP 비율과 댓글 참여도를 비교한 버블 차트입니다.",
    img: url("rank_engagement_summary_latest_ko.png"),
  },

  {
    id: "rank_top_category_ratio_pie_jp",
    section: "rank_comment",
    lang: "ja",
    title: "TOPランキング記事のカテゴリ比率",
    subtitle: "日本語ラベル版",
    description: "TOPランキングに掲載された記事のカテゴリ構成を示した円グラフです。",
    img: url("rank_top_category_ratio_pie_latest_jp.png"),
  },
  {
    id: "rank_top_category_ratio_pie_ko",
    section: "rank_comment",
    lang: "ko",
    title: "TOP 랭킹 기사 카테고리 비율",
    subtitle: "한국어 라벨",
    description: "TOP 랭킹에 포함된 기사들의 카테고리 구성 비율을 나타낸 파이 차트입니다.",
    img: url("rank_top_category_ratio_pie_latest_ko.png"),
  },
  // 🔽 GRAPHS 배열 안에 추가

  // 2025-11 일본어 워드클라우드
  {
    id: "wordcloud_2025_11_jp",
    section: "wordcloud",
    lang: "ja",
    title: "今月のことば - 2025-11",
    subtitle: "2025年11月 Yahoo!ニュースランキング",
    description:
      "2025年11月のTOPニュースタイトルから抽出したキーワードのWordCloudです。",
    img: url("wordcloud_2025-11_jp.png"),
  },

  // 2025-11 한국어 워드클라우드
  {
    id: "wordcloud_2025_11_ko",
    section: "wordcloud",
    lang: "ko",
    title: "이달의 단어 - 2025-11",
    subtitle: "2025년 11월 Yahoo! 뉴스 랭킹",
    description:
      "2025년 11월 TOP 뉴스 제목에서 추출한 키워드를 워드클라우드로 시각화한 이미지입니다.",
    img: url("wordcloud_2025-11_ko.png"),
  },

  // 2025-12 일본어 워드클라우드
  {
    id: "wordcloud_2025_12_jp",
    section: "wordcloud",
    lang: "ja",
    title: "今月のことば - 2025-12",
    subtitle: "2025年12月 Yahoo!ニュースランキング",
    description:
      "2025年12月のTOPニュースタイトルから抽出したキーワードのWordCloudです。",
    img: url("wordcloud_2025-12_jp.png"),
  },

  // 2025-12 한국어 워드클라우드
  {
    id: "wordcloud_2025_12_ko",
    section: "wordcloud",
    lang: "ko",
    title: "이달의 단어 - 2025-12",
    subtitle: "2025년 12월 Yahoo! 뉴스 랭킹",
    description:
      "2025년 12월 TOP 뉴스 제목에서 추출한 키워드를 워드클라우드로 시각화한 이미지입니다.",
    img: url("wordcloud_2025-12_ko.png"),
  },
  // =============================
  // 📌 Time-series Graphs
  // =============================

  {
    id: "ts_avg_rank_over_time_jp",
    section: "timeseries",
    lang: "ja",
    title: "公開後時間に伴う平均ランキングの推移（全体）",
    subtitle: "日本語ラベル版",
    description: "記事公開後の経過時間ごとの平均ランキング（1位に近いほど上位）を示します。",
    img: url("ts_avg_rank_over_time_latest_jp.png"),
  },
  {
    id: "ts_avg_rank_over_time_ko",
    section: "timeseries",
    lang: "ko",
    title: "공개 후 시간에 따른 평균 랭킹 변화(전체)",
    subtitle: "한국어 라벨",
    description: "기사 공개 후 경과 시간에 따라 평균 랭킹이 어떻게 변화하는지를 보여줍니다.",
    img: url("ts_avg_rank_over_time_latest_ko.png"),
  },

  // ---------------------------
  // 2) 카테고리별 시간대 트렌드(댓글 기준)
  // ---------------------------
  {
    id: "ts_category_time_trend_comment_jp",
    section: "timeseries",
    lang: "ja",
    title: "カテゴリ別 時間帯トレンド（コメント数 基準）",
    subtitle: "日本語ラベル版",
    description: "各カテゴリの時間帯別平均コメント数の推移を示したマルチラインプロットです。",
    img: url("ts_category_time_trend_comment_latest_jp.png"),
  },
  {
    id: "ts_category_time_trend_comment_ko",
    section: "timeseries",
    lang: "ko",
    title: "카테고리별 시간대 트렌드(댓글 수 기준)",
    subtitle: "한국어 라벨",
    description: "카테고리별로 시간대 평균 댓글 수가 어떻게 변화하는지 보여주는 멀티라인 그래프입니다.",
    img: url("ts_category_time_trend_comment_latest_ko.png"),
  },

  // ---------------------------
  // 3) 공개 시간대별 평균 댓글 수
  // ---------------------------
  {
    id: "ts_comment_by_publish_hour_jp",
    section: "timeseries",
    lang: "ja",
    title: "公開時間帯別 平均コメント数",
    subtitle: "日本語ラベル版",
    description: "記事の公開時間帯（0~23時）ごとの平均コメント数の傾向を示します。",
    img: url("ts_comment_by_publish_hour_latest_jp.png"),
  },
  {
    id: "ts_comment_by_publish_hour_ko",
    section: "timeseries",
    lang: "ko",
    title: "공개 시간대별 평균 댓글 수",
    subtitle: "한국어 라벨",
    description: "게시물이 공개된 시각(0~23시)에 따라 평균 댓글 수가 어떻게 변하는지 보여줍니다.",
    img: url("ts_comment_by_publish_hour_latest_ko.png"),
  },

  // ---------------------------
  // 4) 카테고리별 댓글 증가 곡선 (공개 후 12시간)
  // ---------------------------

  // ---------------------------
  // 5) 전체 댓글 증가 추이 (공개 후)
  // ---------------------------
  {
    id: "ts_comment_growth_overall_jp",
    section: "timeseries",
    lang: "ja",
    title: "公開後時間に伴う平均コメント数の推移（全体）",
    subtitle: "日本語ラベル版",
    description: "全カテゴリ合計の記事に対する公開後平均コメント数の増加傾向を表します。",
    img: url("ts_comment_growth_overall_latest_jp.png"),
  },
  {
    id: "ts_comment_growth_overall_ko",
    section: "timeseries",
    lang: "ko",
    title: "공개 후 시간에 따른 평균 댓글 수 변화(전체)",
    subtitle: "한국어 라벨",
    description: "전체 기사 기준으로 공개 후 평균 댓글 수가 어떻게 증가하는지 보여줍니다.",
    img: url("ts_comment_growth_overall_latest_ko.png"),
  },
  {
    id: "ts_comment_reaction_heatmap_jp",
    section: "timeseries",
    lang: "ja",
    title: "公開時間 × 経過時間別 コメント反応ヒートマップ",
    subtitle: "記事の公開時刻と経過時間ごとのコメント数の分布",
    description:
      "縦軸に記事の公開時刻（0〜23時）、横軸に公開からの経過時間（0〜11時間）を取り、各マスの色でコメント数の多さを表現したヒートマップです。いつ公開した記事が、その後どのタイミングで最も盛り上がるかを直感的に把握できます。",
    img: url("ts_comment_reaction_heatmap_latest_jp.png"),
  },
  {
    id: "ts_comment_reaction_heatmap_ko",
    section: "timeseries",
    lang: "ko",
    title: "공개 시각 × 경과 시간별 댓글 반응 히트맵",
    subtitle: "기사 공개 시각과 이후 경과 시간에 따른 댓글 수 분포",
    description:
      "세로축은 기사 공개 시각(0~23시), 가로축은 공개 후 경과 시간(0~11시간)을 나타내고, 각 칸의 색 농도로 댓글 수의 많고 적음을 표현한 히트맵입니다. 기사를 언제 올렸을 때, 이후 어느 타이밍에 반응이 가장 뜨거운지 한눈에 볼 수 있습니다.",
    img: url("ts_comment_reaction_heatmap_latest_ko.png"),
  }, 
  // ---------------------------
  //  오버뷰!!
  // ---------------------------
  {
    id: "ts_category_time_trend_comment_jp",
    section: "overview",
    lang: "ja",
    title: "カテゴリ別 時間帯トレンド（コメント数 基準）",
    subtitle: "日本語ラベル版",
    description: "各カテゴリの時間帯別平均コメント数の推移を示したマルチラインプロットです。",
    img: url("ts_category_time_trend_comment_latest_jp.png"),
  },
  {
    id: "ts_category_time_trend_comment_ko",
    section: "overview",
    lang: "ko",
    title: "카테고리별 시간대 트렌드(댓글 수 기준)",
    subtitle: "한국어 라벨",
    description: "카테고리별로 시간대 평균 댓글 수가 어떻게 변화하는지 보여주는 멀티라인 그래프입니다.",
    img: url("ts_category_time_trend_comment_latest_ko.png"),
  },
  {
    id: "media_article_count_in_top_jp",
    section: "overview",
    lang: "ja",
    title: "総合TOPカテゴリ内 メディア別記事数（上位15社）",
    subtitle: "日本語ラベル版",
    description: "総合TOPカテゴリにおけるメディア別の記事数の上位15社を示した棒グラフです。",
    img: url("media_article_count_in_top_latest_jp.png"),
  },
  {
    id: "media_article_count_in_top_ko",
    section: "overview",
    lang: "ko",
    title: "종합 TOP 카테고리 내 언론사별 기사 수 (상위 15개)",
    subtitle: "한국어 라벨",
    description: "종합 TOP 카테고리에서 언론사별 기사 수 상위 15개를 보여주는 막대 그래프입니다.",
    img: url("media_article_count_in_top_latest_ko.png"),
  },


];
