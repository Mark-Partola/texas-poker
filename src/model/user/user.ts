import { v4 } from "uuid";

export class User {
  private uid: string = v4();
  private hand: ICard[] = [];

  public setHand(hand: ICard[]): void {
    this.hand = hand;
  }

  public getId(): string {
    return this.uid;
  }
}
