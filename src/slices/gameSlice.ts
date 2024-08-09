import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DifficultyEnum } from "../types";
import { Card, GameState } from "./types";
import {
  ATTEMPT_PENALTY,
  CORRECT_GUESS_BONUS,
  TIME_PENALTY,
} from "./constants";
import { generateCards } from "../utils/intex";

const initialState: GameState = {
  cards: [],
  difficulty: DifficultyEnum.Easy,
  timer: 0,
  score: 0,
  attempts: 0,
  correctGuesses: 0,
  gameStarted: false,
  gameWasReset: false,
  userWon: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDifficulty(state, action: PayloadAction<DifficultyEnum>) {
      state.difficulty = action.payload;
    },
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
    },
    incrementTimer(state) {
      state.timer += 1;
    },
    incrementAttempts(state) {
      state.attempts += 1;
    },
    incrementCorrectGuesses(state) {
      state.correctGuesses += 1;
    },
    addScore(state) {
      state.score += 10;
    },
    calculateScore(state) {
      const baseScore = state.correctGuesses * CORRECT_GUESS_BONUS;
      const penalty =
        state.attempts * ATTEMPT_PENALTY + state.timer * TIME_PENALTY;
      state.score = Math.max(baseScore - penalty, 0);
    },
    startGame(state) {
      state.gameStarted = true;
      state.userWon = false;
    },
    stopGame(state) {
      state.gameStarted = false;
      state.userWon = true;
    },
    setWasReset(state, action: PayloadAction<boolean>) {
      state.gameWasReset = action.payload;
    },
    resetGame(state) {
      state.cards = generateCards(state.difficulty);
      state.timer = 0;
      state.score = 0;
      state.attempts = 0;
      state.correctGuesses = 0;
      state.gameStarted = false;
      state.gameWasReset = true;
    },
  },
});

export const gameSliceReducer = gameSlice.reducer;
export const {
  setDifficulty,
  setCards,
  incrementTimer,
  incrementAttempts,
  incrementCorrectGuesses,
  addScore,
  calculateScore,
  startGame,
  stopGame,
  setWasReset,
  resetGame,
} = gameSlice.actions;
