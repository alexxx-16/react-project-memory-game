import { type Card } from "./types";

// generates the deck

const emojis = ["🍇", "🥝", "🍓", "🍌", "🍊", "🍉", "🍋", "🫐"];

export const generateDeck = (): Card[] => {
  const pairedEmojis = [...emojis, ...emojis];

  const shuffledEmojis = pairedEmojis.sort(() => Math.random() - 0.5);

  return shuffledEmojis.map((emoji, index) => ({
    id: index,
    emoji: emoji,
    isFlipped: false,
    isMatched: false,
  }));
};
