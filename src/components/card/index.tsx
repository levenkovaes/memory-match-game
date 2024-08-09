import React from "react";
import "./styles.scss";
import { CardProps } from "./types";

const Card: React.FC<CardProps> = ({
  id,
  emoji,
  matched,
  flipped,
  onClick,
}) => {
  const handleClick = () => !flipped && !matched && onClick(id);

  return (
    <div
      className={`card ${!flipped ? "flipped" : ""} ${
        matched ? "matched" : ""
      }`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">{emoji}</div>
        <div className="card-back">🃏</div>
      </div>
    </div>
  );
};

export default Card;
