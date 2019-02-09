import * as defer from "p-defer";

interface IPlayerConfig {
  user: IUser;
}

export class Player implements IPlayer {
  private hand: ICard[] = [];

  private deferredTrade: defer.DeferredPromise<ITradingAction> | null = null;

  constructor(private readonly config: IPlayerConfig) {}

  public get id(): string {
    return this.config.user.id;
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

  public acceptTrade(availableActions: string[]): Promise<ITradingAction> {
    this.deferredTrade = defer();

    return this.deferredTrade.promise;
  }
}
