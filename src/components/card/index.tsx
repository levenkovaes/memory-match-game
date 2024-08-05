import React from "react";
import "./styles.scss";
import { EmojisEnum } from "../../types";

interface CardProps {
  id: string;
  emoji: EmojisEnum;
  matched: boolean;
  flipped: boolean;
  onClick: (id: string) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  emoji,
  matched,
  flipped,
  onClick,
}) => {
  return (
    <div
      className={`card ${!flipped ? "flipped" : ""} ${
        matched ? "matched" : ""
      }`}
      onClick={() => !flipped && !matched && onClick(id)}
    >
      <div className="card-inner">
        <div className="card-front">{emoji}</div>
        <div className="card-back">🃏</div>
      </div>
    </div>
  );
};

export default Card;
