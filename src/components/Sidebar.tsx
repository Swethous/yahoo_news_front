import type { Language, Section } from "../data/graphs";

type SidebarProps = {
  active: Section;
  onChange: (s: Section) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
};

const Sidebar = ({ active, onChange, language }: SidebarProps) => {
  // 언어별 label 묶은 객체
  const labels = {
    ja: {
      overview: "Overview",
      week_ranking: "今週、ランキング",
      timeseries: "時系列分析",
      rank_comment: "ランク＆コメント分析",
      media: "メディア分析",
      wordcloud: "ワードクラウド",
    },
    ko: {
      overview: "Overview",
      week_ranking: "이번주 랭킹",
      timeseries: "시계열 분석",
      rank_comment: "랭크 & 댓글 분석",
      media: "언론사 분석",
      wordcloud: "워드클라우드",
    },
  } as const;

  // items 정의
  const items: { id: Section; label: string }[] = [
    { id: "overview", label: labels[language].overview },
    { id: "week_ranking", label: labels[language].week_ranking },
    { id: "timeseries", label: labels[language].timeseries },
    { id: "rank_comment", label: labels[language].rank_comment },
    { id: "media", label: labels[language].media },
    { id: "wordcloud", label: labels[language].wordcloud },
  ];

  return (
    <aside className="Sidebar">
      <div className="Sidebar__title">
        {language === "ja" ? "Yahoo News 分析" : "야후 뉴스 분석"}
      </div>

      <ul className="Sidebar__menu">
        {items.map((item) => (
          <li
            key={item.id}
            className={
              "Sidebar__item" + (active === item.id ? " Sidebar__item--active" : "")
            }
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
