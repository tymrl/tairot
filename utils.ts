import { OPENAI_API_KEY } from "@env";

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

export interface Card {
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

export const sendToChatGPT = async (message: String) => {
  const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error contacting OpenAI:", error);
    throw error;
  }
};
