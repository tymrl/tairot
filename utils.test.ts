import { createShuffledDeck, nameToCard } from "./utils";

describe("createShuffledDeck", () => {
  test("should return an array", () => {
    const deck = createShuffledDeck();
    expect(Array.isArray(deck)).toBe(true);
  });

  test("should return a full deck of 78 cards", () => {
    const deck = createShuffledDeck();
    expect(deck.length).toBe(78);
  });

  test('should contain "The Fool" as one of the cards', () => {
    const deck = createShuffledDeck();
    const containsTheFool = deck.some((card) => card.name === "The Fool");
    expect(containsTheFool).toBe(true);
  });

  test("should not return cards in a fixed order", () => {
    const firstDeck = createShuffledDeck();
    const secondDeck = createShuffledDeck();
    const different = firstDeck.some(
      (card, index) => card.name !== secondDeck[index].name
    );
    expect(different).toBe(true);
  });

  test("every card should have a name and imageUrl", () => {
    const deck = createShuffledDeck();
    const everyCardIsValid = deck.every((card) => card.name && card.imageUrl);
    expect(everyCardIsValid).toBe(true);
  });

  // Add more tests as needed...
});

describe("nameToCard function", () => {
  it("should return a card object with the correct name and imageUrl properties", () => {
    const cardName = "The Fool";
    const expectedImageUrl =
      "https://www.free-tarot-reading.net/img/cards/rider-waite/the-fool.jpg";
    const result = nameToCard(cardName);

    expect(result).toHaveProperty("name", cardName);
    expect(result).toHaveProperty("imageUrl", expectedImageUrl);
  });

  it("should correctly handle names with spaces", () => {
    const cardName = "Wheel of Fortune";
    const expectedImageUrl =
      "https://www.free-tarot-reading.net/img/cards/rider-waite/wheel-of-fortune.jpg";
    const result = nameToCard(cardName);

    expect(result.imageUrl).toBe(expectedImageUrl);
  });

  it("should convert card names to lowercase for the URL", () => {
    const cardName = "DEATH";
    const expectedImageUrl =
      "https://www.free-tarot-reading.net/img/cards/rider-waite/death.jpg";
    const result = nameToCard(cardName);

    expect(result.imageUrl).toBe(expectedImageUrl);
  });
});
