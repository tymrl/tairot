export const createShuffledDeck = () => {
  const suits = ["Wands", "Cups", "Swords", "Pentacles"];
  const ranks = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Page",
    "Knight",
    "Queen",
    "King",
  ];

  const majorArcana = [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Strength",
    "The Hermit",
    "Wheel of Fortune",
    "Justice",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World",
  ];

  let deck = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      const name = rank + " of " + suit;
      deck.push(nameToCard(name));
    }
  }

  for (const name of majorArcana) {
    deck.push(nameToCard(name));
  }

  const shuffledDeck = [];

  while (deck.length > 0) {
    const index = Math.floor(Math.random() * deck.length);
    shuffledDeck.push(deck.splice(index, 1)[0]);
  }

  return shuffledDeck;
};

interface Card {
  name: string;
  imageUrl: string;
}

export const nameToCard = (name: string): Card => {
  return {
    name,
    imageUrl:
      "https://www.free-tarot-reading.net/img/cards/rider-waite/" +
      name.toLocaleLowerCase().replaceAll(" ", "-") +
      ".jpg",
  };
};
