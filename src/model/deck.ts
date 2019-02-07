import { Suits } from "./suits";

export class Deck {
  private cards: ICard[];

  constructor() {
    this.cards = this.getDeck();
    this.shuffle();
  }

  public draw(): ICard {
    return this.cards.pop() as ICard;
  }

  public shuffle(): void {
    // Fisher–Yates shuffle method
    for (let i = this.cards.length; i > 0; i--) {
      const k = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[k]] = [this.cards[k], this.cards[i - 1]];
    }
  }

  private getDeck(): ICard[] {
    const values = Array.from({ length: 13 }, (_, idx) => idx + 1);
    const suits = [Suits.hearts, Suits.spades, Suits.diamonds, Suits.croses];

    return values.reduce(
      (acc, value) => {
        suits.forEach(suit => acc.push({ suit, value }));

        return acc;
      },
      [] as ICard[]
    );
  }
}
