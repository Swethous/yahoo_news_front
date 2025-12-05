// src/components/WordCloudTopicSlider.tsx
import { useState } from "react";
import type { Language } from "../data/graphs";
import { GRAPHS } from "../data/graphs";
import "./WordCloudSlider.css";

type GraphConfig = (typeof GRAPHS)[number];

type Props = {
  graphs: GraphConfig[];
  language: Language;
};

const getMonthLabel = (
  index: number,
  total: number,
  language: Language
): string => {
  const today = new Date();

  // 마지막 슬라이드 = 이번 달
  const offset = index - (total - 1);

  const base = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const month = base.getMonth() + 1;

  if (language === "ja") {
    return `${month}月のトピック`;
  }
  return `${month}월의 토픽`;
};

const WordCloudTopicSlider = ({ graphs, language }: Props) => {
  if (graphs.length === 0) return null;

  // 처음에 "마지막(가장 최신)" 그래프를 보여주고 싶으면 이렇게
  const [index, setIndex] = useState(graphs.length - 1);
  const current = graphs[index];

  const prev = () =>
    setIndex((i) => (i === 0 ? graphs.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === graphs.length - 1 ? 0 : i + 1));

  const titleText = getMonthLabel(index, graphs.length, language);

  return (
    <section className="WordCloudTopic">
      <div className="WordCloudTopic__header">
        <button
          type="button"
          className="WordCloudTopic__arrow"
          onClick={prev}
        >
          ◀
        </button>

        <span className="WordCloudTopic__title">{titleText}</span>

        <button
          type="button"
          className="WordCloudTopic__arrow"
          onClick={next}
        >
          ▶
        </button>
      </div>

      <div className="WordCloudTopic__imageWrapper">
        {/* 여기 필드 이름은 네 GRAPHS 구조에 맞게 수정 (예: current.img, current.src 등) */}
        <img
          src={current.img}
          alt={current.title}
          className="WordCloudTopic__img"
        />
      </div>
    </section>
  );
};

export default WordCloudTopicSlider;
