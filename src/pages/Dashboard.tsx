// src/pages/Dashboard.tsx
import GraphCard from "../components/GraphCard";
import { GRAPHS } from "../data/graphs";
import type { Section, Language } from "../data/graphs";
import WordCloudSlider from "../components/WordCloudSlider"; // 🔥 워드클라우드
import WeekRanking from "../components/WeekRanking";
import Overview from "../components/Overview";

type DashboardProps = {
  section: Section;
  language: Language;
};

// GRAPHS 한 개의 타입 추출
type GraphConfig = (typeof GRAPHS)[number];

const Dashboard = ({ section, language }: DashboardProps) => {
  const graphs: GraphConfig[] = GRAPHS.filter(
    (g) => g.section === section && (!g.lang || g.lang === language)
  );

  console.log("section:", section, "language:", language, "graphs:", graphs.length);

  // 🔥 wordcloud 섹션은 따로 렌더링 (기존 그대로)
  if (section === "wordcloud") {
    return (
      <div className="Dashboard__wordcloud">
        <WordCloudSlider graphs={graphs} language={language} />
      </div>
    );
  }

  // 🔥 wordcloud 섹션은 따로 렌더링 (기존 그대로)
  if (section === "week_ranking") {
    return (
      <div className="Dashboard_week_ranking">
        <WeekRanking language={language} />
      </div>
    );
  }

  // 🔥 Overview 섹션은 따로 렌더링 (기존 그대로)
  if (section === "overview") {
    return (
      <div className="Dashboard_overview">
        <Overview graphs={graphs} language={language}/>
      </div>
    );
  }

  // ✅ 나머지 섹션은 기존 카드 그리드 유지
  return (
    <div className="GraphGrid">
      {graphs.map((graph) => (
        <GraphCard key={graph.id} graph={graph} />
      ))}
    </div>
  );
};

export default Dashboard;
