import { useEffect, useState } from "react";
import WeekRankingItem from "./WeekRankingItem";
import "./WeekRanking.css";
import type { Language } from "../data/graphs";

type RankItem = {
  title: string;
  media: string;
  comment_count?: number;
  stay_hours?: number;
  url: string;
};

type WeekRankingProps = {
  language: Language;
};

const TEXT = {
  ko: {
    headerTitle: "이번 주 Yahoo! 뉴스 TOP 랭킹",
    headerSubtitle: "직전 1주일 동안의 댓글 수 / 체류시간 기준 TOP 10 기사입니다.",
    commentTitle: "댓글 수 기준 TOP 10",
    commentSubtitle: "이번 주 가장 댓글이 활발하게 달린 기사",
    stayTitle: "체류시간 기준 TOP 10",
    staySubtitle: "독자들이 오래 머문 집중도 높은 기사",
    commentLabel: "댓글",
    stayLabel: "체류시간",
    error: "주간 랭킹 데이터를 불러오지 못했습니다.",
  },
  ja: {
    headerTitle: "今週の Yahoo!ニュース TOPランキング",
    headerSubtitle:
      "直近1週間のコメント数 / 滞在時間を基準としたTOP10記事です。",
    commentTitle: "コメント数ランキング TOP10",
    commentSubtitle: "今週もっともコメントが活発だった記事",
    stayTitle: "滞在時間ランキング TOP10",
    staySubtitle: "読者が長く滞在した注目度の高い記事",
    commentLabel: "コメント",
    stayLabel: "滞在時間",
    error: "週間ランキングデータを取得できませんでした。",
  },
} as const;

const WeekRanking = ({ language }: WeekRankingProps) => {
  const [commentRank, setCommentRank] = useState<RankItem[]>([]);
  const [stayRank, setStayRank] = useState<RankItem[]>([]);
  const [hasError, setHasError] = useState(false);

  const t = TEXT[language];

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const res = await fetch(
          "https://logfryaxmjntuxfqfmtr.supabase.co/storage/v1/object/public/yahoo-results/latest/weekly_rankings.json"
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        console.log("weekly_rankings.json:", data);

        setCommentRank(data.top_comment_count || []);
        setStayRank(data.top_stay_time || []);
      } catch (e: any) {
        console.error(e);
        setHasError(true);
      }
    };

    fetchWeekly();
  }, []);

  if (hasError) {
    return <div className="WeekRanking">{t.error}</div>;
  }

  return (
    <div className="WeekRanking">
      <header className="WeekRanking__header">
        <h2 className="WeekRanking__title">{t.headerTitle}</h2>
        <p className="WeekRanking__subtitle">{t.headerSubtitle}</p>
      </header>

      <div className="WeekRanking__grid">
        {/* 왼쪽: 댓글 순 랭킹 */}
        <section className="WeekRankingList">
          <h3 className="WeekRankingList__title">{t.commentTitle}</h3>
          <p className="WeekRankingList__subtitle">{t.commentSubtitle}</p>

          <ul className="WeekRankingList__list">
            {commentRank.slice(0, 10).map((item, index) => (
              <WeekRankingItem
                key={`comment-${index}`}
                rank={index + 1}
                title={item.title}
                media={item.media}
                value={item.comment_count ?? 0}
                valueLabel={t.commentLabel}
                url={item.url}
              />
            ))}
          </ul>
        </section>

        {/* 오른쪽: 체류시간 순 랭킹 */}
        <section className="WeekRankingList">
          <h3 className="WeekRankingList__title">{t.stayTitle}</h3>
          <p className="WeekRankingList__subtitle">{t.staySubtitle}</p>

          <ul className="WeekRankingList__list">
            {stayRank.slice(0, 10).map((item, index) => (
              <WeekRankingItem
                key={`stay-${index}`}
                rank={index + 1}
                title={item.title}
                media={item.media}
                value={Math.round(item.stay_hours ?? 0)} // 🔥 자연수로
                valueLabel={t.stayLabel}
                url={item.url}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default WeekRanking;
