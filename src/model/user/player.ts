import * as defer from "p-defer";

interface IPlayerConfig {
  user: IUser;
}

export class Player implements IPlayer {
  private hand: ICard[] = [];

  private trade: defer.DeferredPromise<void> | null = null;

  constructor(private readonly config: IPlayerConfig) {}

  public getId(): string {
    return this.config.user.getId();
  }

  public setHand(hand: ICard[]): void {
    this.hand = hand;
  }

  public check(): void {
    if (!this.trade) {
      throw new Error("Unavailable action");
    }

    this.trade.resolve();
  }

  public acceptTrade(): Promise<void> {
    this.trade = defer();

    return this.trade.promise;
  }
}
