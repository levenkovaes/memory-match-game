import { DifficultyEnum, EmojisEnum } from "../types";

export interface Card {
  id: string;
  emoji: EmojisEnum;
  matched: boolean;
}

export interface GameState {
  cards: Card[];
  difficulty: DifficultyEnum;
  timer: number;
  score: number;
  attempts: number;
  correctGuesses: number;
  gameStarted: boolean;
  gameWasReset: boolean;
  userWon: boolean;
}
