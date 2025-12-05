interface WeekRankingItemProps {
  rank: number;
  title: string;
  media: string;
  value: number;       // comment_count 또는 stay_time
  valueLabel: string;  // "댓글" 또는 "체류시간"
  url: string;
}

const WeekRankingItem = ({
  rank,
  title,
  media,
  value,
  valueLabel,
  url,
}: WeekRankingItemProps) => {
  return (
    <li className="WeekRankingList__item">

      <div className="WeekRankingList__rank">{rank}</div>

      <div className="WeekRankingList__main">
        {/* 제목 클릭하면 기사 url로 이동 */}
        <a
          href={url}
          className="WeekRankingList__text"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>

        <div className="WeekRankingList__metaRow">
          <span className="WeekRankingList__media">{media}</span>
        </div>
      </div>

      <div className="WeekRankingList__metric">
        <div className="WeekRankingList__metricLabel">{valueLabel}</div>
        <div className="WeekRankingList__metricValue">
          {value.toLocaleString()}
        </div>
      </div>
    </li>
  );
};

export default WeekRankingItem;
