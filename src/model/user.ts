export class User {
  private hand: ICard[] = [];

  public setHand(hand: ICard[]): void {
    this.hand = hand;
  }
}
