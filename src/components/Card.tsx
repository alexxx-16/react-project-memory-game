import { type Card as CardType } from "../types";

interface CardProps {
  card: CardType;
  handleChoice: (card: CardType) => void;
  flipped: boolean;
}

export const Card = ({ card, handleChoice, flipped }: CardProps) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div
      className="relative aspect-square cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front side (with emoji) - Initially turned away from user */}
        <div className="absolute inset-0 w-full h-full bg-slate-800 border-2 border-cyan-400 rounded-lg flex items-center justify-center text-4xl [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          {card.emoji}
        </div>

        {/* Back Side (with "?") - Facing user initially */}
        <div className="absolute inset-0 w-full h-full bg-slate-700 border-2 border-slate-500 rounded-lg flex items-center justify-center text-4xl text-cyan-400 [backface-visibility:hidden]">
          ?
        </div>
      </div>
    </div>
  );
};
