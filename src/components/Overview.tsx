// src/components/Overview.tsx
import { useEffect, useState } from "react";
import type { GraphItem, Language } from "../data/graphs";
import WeekRankingItem from "./WeekRankingItem";
import "./Overview.css";

type RankItem = {
  title: string;
  media: string;
  comment_count?: number;
  url?: string;
};

type OverviewProps = {
  graphs: GraphItem[];   // 🔥 Dashboard에서 넘어온 overview용 그래프들
  language: Language;    // 필요하면 텍스트 다국어에 사용
};

const Overview = ({ graphs, language }: OverviewProps) => {
  const [commentRank, setCommentRank] = useState<RankItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 왼쪽에 쓸 대표 그래프 2개만 사용
  const overviewGraphs = graphs.slice(0, 2);

  // 이번 주 댓글 랭킹 불러오기
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
        console.log("overview weekly_rankings.json:", data);

        setCommentRank(data.top_comment_count || []);
      } catch (e) {
        console.error(e);
        setError("이번 주 랭킹 데이터를 불러오지 못했습니다.");
      }
    };

    fetchWeekly();
  }, []);

  if (error) {
    return <div className="Overview">{error}</div>;
  }

  // 간단한 다국어 제목/설명 (쓰고 싶으면)
  const rightTitle =
    language === "ja" ? "今週のコメント数 TOP 10" : "이번 주 댓글 수 TOP 10";
  const rightSubtitle =
    language === "ja"
      ? "直近1週間でもっともコメントが多かった記事です。"
      : "직전 1주일 동안 가장 댓글이 많이 달린 기사입니다.";

  return (
    <div className="Overview">
      <div className="Overview__grid">
        {/* 왼쪽: 대표 그래프 2개 (위/아래 카드) */}
        <div className="Overview__left">
          {overviewGraphs.map((graph) => (
            <section className="GraphCard" key={graph.id}>
              <div className="GraphCard__header">
                <h2 className="GraphCard__title">{graph.title}</h2>

              </div>

              <div className="GraphCard__body">
                <img
                  className="GraphCard__image"
                  src={graph.img}
                  alt={graph.title}
                />
              </div>

              {graph.description && (
                <p className="GraphCard__description">
                  {graph.description}
                </p>
              )}
            </section>
          ))}
        </div>

        {/* 오른쪽: 이번 주 댓글 수 TOP 10 */}
        <div className="Overview__right">
          <section className="WeekRankingList">
            <h3 className="WeekRankingList__title">{rightTitle}</h3>
            <p className="WeekRankingList__subtitle">{rightSubtitle}</p>

            <ul className="WeekRankingList__list">
              {commentRank.slice(0, 10).map((item, index) => (
                <WeekRankingItem
                  key={`overview-comment-${index}`}
                  rank={index + 1}
                  title={item.title}
                  media={item.media}
                  value={item.comment_count ?? 0}
                  valueLabel={language === "ja" ? "コメント" : "댓글"}
                  url={item.url ?? "#"}
                />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Overview;
