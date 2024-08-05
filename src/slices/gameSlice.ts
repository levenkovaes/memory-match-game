import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DifficultyEnum } from "../types";
import { Card, GameState } from "./types";
import {
  ATTEMPT_PENALTY,
  CORRECT_GUESS_BONUS,
  TIME_PENALTY,
} from "./constants";

const initialState: GameState = {
  cards: [],
  difficulty: DifficultyEnum.Easy,
  timer: 0,
  score: 0,
  attempts: 0,
  correctGuesses: 0,
  gameStarted: false,
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
    },
    stopGame(state) {
      state.gameStarted = false;
    },
    resetGame(state) {
      // TODO
      state.cards = [];
      state.timer = 0;
      state.score = 0;
      state.attempts = 0;
      state.correctGuesses = 0;
      state.gameStarted = false;
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
  resetGame,
} = gameSlice.actions;
