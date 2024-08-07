import { EmojisEnum } from "../../types";

export interface CardProps {
  id: string;
  emoji: EmojisEnum;
  matched: boolean;
  flipped: boolean;
  onClick: (id: string) => void;
}
