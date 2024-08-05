import { nanoid } from "@reduxjs/toolkit";
import { DifficultyEnum, EmojisEnum } from "../types";

function shuffleArray(array: any[]) {
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
}

export const generateCards = (difficulty: DifficultyEnum) => {
  const emojis = Object.values(EmojisEnum);
  const pairs =
    difficulty === DifficultyEnum.Easy
      ? 5
      : difficulty === DifficultyEnum.Medium
      ? 8
      : 10;
  const selectedEmojis = shuffleArray(emojis).slice(0, pairs);
  const cards = shuffleArray(
    [...selectedEmojis, ...selectedEmojis].map((emoji) => ({
      emoji,
      id: nanoid(),
      matched: false,
    }))
  );
  return cards;
};
