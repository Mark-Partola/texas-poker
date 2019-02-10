import { Suits } from "./suits";

export class Card implements ICard {
  constructor(private readonly config: { value: number; suit: number }) {}

  public get value(): number {
    return this.config.value;
  }

  public get suit(): number {
    return this.config.suit;
  }

  public get name(): string {
    return `${this.value} ${Suits[this.suit]}`;
  }
}
