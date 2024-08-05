import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  addScore,
  calculateScore,
  incrementAttempts,
  incrementCorrectGuesses,
  incrementTimer,
  setCards,
  startGame,
  stopGame,
} from "../../slices/gameSlice";
import Card from "../card";
import "./styles.scss";
import { generateCards } from "../../utils/intex";

const Game: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { cards, difficulty, gameStarted } = useSelector(
    (state: RootState) => state.game
  );
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setCards(generateCards(difficulty)));
  }, [difficulty, dispatch]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameStarted) {
      interval = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted, dispatch]);

  const handleCardClick = (id: string) => {
    if (isChecking) return;
    if (!gameStarted) dispatch(startGame());
    setFlippedCards((prev) => [...prev, id]);
    if (flippedCards.length === 1) {
      setIsChecking(true);
      const [firstCard] = cards.filter((card) => card.id === flippedCards[0]);
      const [secondCard] = cards.filter((card) => card.id === id);

      if (firstCard.emoji === secondCard.emoji) {
        dispatch(incrementAttempts());
        dispatch(incrementCorrectGuesses());
        dispatch(addScore());
        dispatch(
          setCards(
            cards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, matched: true }
                : card
            )
          )
        );
      } else {
        dispatch(incrementAttempts());
      }

      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
        dispatch(calculateScore());

        if (
          cards.every(
            (card) =>
              card.matched ||
              card.id === firstCard.id ||
              card.id === secondCard.id
          )
        ) {
          dispatch(stopGame());
        }
      }, 1000);
    }
  };

  return (
    <div className="game">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          emoji={card.emoji}
          matched={card.matched}
          flipped={flippedCards.includes(card.id) || card.matched}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default Game;
