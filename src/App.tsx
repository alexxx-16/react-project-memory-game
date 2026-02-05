import { useEffect, useState } from "react";
import { type Card as CardType } from "./types";
import { generateDeck } from "./data";
import { Card } from "./components/Card";

const App = () => {
  const [cards, setCards] = useState<CardType[]>(generateDeck());

  const [choiceOne, setChoiceOne] = useState<CardType | null>(null); //either CardType or null
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);

  const [disabled, setDisabled] = useState<boolean>(false);
  const [moves, setMoves] = useState(0);

  // initiate game
  const resetGame = () => {
    setCards(generateDeck());
    setChoiceOne(null);
    setChoiceTwo(null);
    setMoves(0);
    setDisabled(false); // timeout when mismatched cards flip back
  };

  useEffect(() => {
    resetGame();
  }, []);

  // when user clicks a card
  const handleChoice = (card: CardType) => {
    // prevent user from clicking the card again if these conditions happen
    if (disabled || card.isMatched || card.id === choiceOne?.id) return;

    // change the card user clicked to isFlipped:true
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c)),
    );

    // check if it's the first or second card clicked
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare two chosen cards
  useEffect(() => {
    // clicked 2 card, cant click them any more till timeout's over
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      // cards match
      if (choiceOne.emoji === choiceTwo.emoji) {
        setCards((prev) =>
          prev.map((card) =>
            card.emoji === choiceOne.emoji
              ? { ...card, isMatched: true }
              : card,
          ),
        );
        resetTurn();
      } else {
        // no match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === choiceOne?.id || card.id === choiceTwo?.id
                ? { ...card, isFlipped: false }
                : card,
            ),
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setMoves((prev) => prev + 1);
    setDisabled(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_#22D3ee]">
        Neon Memory
      </h1>
      <div className="mb-6 flex gap-8 text-xl items-center">
        <p>
          Moves: <span className="text-cyan-400 font-mono">{moves}</span>{" "}
        </p>
        <button
          onClick={resetGame}
          className="bg-cyan-600 hover:bg-cyan-500 px-3 py-2 rounded-lg transition-colors"
        >
          New Game
        </button>
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-4 w-full max-w-md">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card.isFlipped || card.isMatched}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
