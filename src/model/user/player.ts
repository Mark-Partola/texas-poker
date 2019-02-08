import * as defer from "p-defer";

interface IPlayerConfig {
  user: IUser;
}

export class Player implements IPlayer {
  private hand: ICard[] = [];

  private deferredTrade: defer.DeferredPromise<ITradingAction> | null = null;

  constructor(private readonly config: IPlayerConfig) {}

  public getId(): string {
    return this.config.user.getId();
  }

  public setHand(hand: ICard[]): void {
    this.hand = hand;
  }

  public trade(action: ITradingAction): void {
    if (!this.deferredTrade) {
      throw new Error("Unavailable action");
    }

    this.deferredTrade.resolve(action);
    this.deferredTrade = null;
  }

  public acceptTrade(): Promise<ITradingAction> {
    this.deferredTrade = defer();

    return this.deferredTrade.promise;
  }
}
