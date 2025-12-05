// src/i18n/texts.ts
import type { Language } from "../data/graphs";
import type { Section } from "../data/graphs";

export const TEXTS: Record<
  Language,
  {
    title: string;
    subtitle: string;
    sidebar: {
      title: string;
      items: Record<Section, string>;
    };
  }
> = {
  ja: {
    title: "Yahooニュースランキング分析ダッシュボード",
    subtitle: "データは、各カテゴリの上位10件の記事を対象に、過去90日間で収集した全データを集計したものです。",
    sidebar: {
      title: "Yahoo News 分析",
      items: {
        overview: "Overview",
        week_ranking: "今週、ランキング",
        timeseries: "時系列分析",
        rank_comment: "ランク＆コメント分析",
        media: "メディア分析",
        wordcloud: "ワードクラウド",
      },
    },
  },

  ko: {
    title: "야후 뉴스 랭킹 분석 대시보드",
    subtitle: "데이터는 각 카테고리별 상위 10개 기사를 기준으로, 최근 90일간 수집한 전체 데이터를 집계한 것입니다.",
    sidebar: {
      title: "야후 뉴스 분석",
      items: {
        overview: "개요",
        week_ranking: "이번 주 랭킹",
        timeseries: "시계열 분석",
        rank_comment: "랭킹 & 댓글 분석",
        media: "언론사 분석",
        wordcloud: "워드클라우드",
      },
    },
  },
};
