import * as defer from "p-defer";

interface IPlayerConfig {
  user: IUser;
}

interface IPlayerTradeSubject {
  subject: defer.DeferredPromise<ITradingAction>;
  params: IPlayerAcceptTradeParams;
}

export class Player implements IPlayer {
  private hand: ICard[] = [];

  private tradeSubject: IPlayerTradeSubject | null = null;

  constructor(private readonly config: IPlayerConfig) {}

  public get id(): string {
    return this.config.user.id;
  }

  public setHand(hand: ICard[]): void {
    this.hand = hand;
  }

  public trade(action: ITradingAction): void {
    const actions = this.tradeSubject ? this.tradeSubject.params.actions : [];
    const minBet = this.tradeSubject ? this.tradeSubject.params.minBet : 0;

    if (!this.tradeSubject || !actions.includes(action.type)) {
      throw new Error(
        `Player: Unavailable action. Available: ${actions.join(", ") || "nope"}`
      );
    }

    if (action.type === "raise" && action.payload.value < minBet) {
      throw new Error(`Player: cannot bet. Minimum possible bet is ${minBet}`);
    }

    this.tradeSubject.subject.resolve(action);
    this.tradeSubject = null;
  }

  public acceptTrade(
    params: IPlayerAcceptTradeParams
  ): Promise<ITradingAction> {
    const subject = defer<ITradingAction>();

    this.tradeSubject = {
      subject,
      params
    };

    return subject.promise;
  }
}
