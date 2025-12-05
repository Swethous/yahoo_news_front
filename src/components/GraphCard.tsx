// src/components/GraphCard.tsx
import type { GraphItem } from "../data/graphs";
import "./GraphCard.css";

type GraphCardProps = {
  graph: GraphItem;
};

const GraphCard = ({ graph }: GraphCardProps) => {
  return (
    <article className="GraphCard">
      <h2 className="GraphCard__title">{graph.title}</h2>
      <div className="GraphCard__imageWrapper">
        <img src={graph.img} alt={graph.title} />
      </div>
    </article>
  );
};

export default GraphCard;
