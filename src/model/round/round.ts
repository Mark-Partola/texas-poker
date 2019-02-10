import { Deck } from "../deck/deck";
import { Trading } from "../trading/trading";
import { RoundIdleState } from "./round-idle-state";
import { RoundPreflopState } from "./round-preflop-state";
import { RoundFlopState } from "./round-flop-state";
import { RoundTurnState } from "./round-turn-state";
import { RoundRiverState } from "./round-river-state";
import { RoundShowdownState } from "./round-showdown-state";

interface IRoundConfig {
  table: ITable;
}

export class Round implements IRoundStateContext {
  private state: IRoundState;

  private states: IRoundStates = {
    idle: new RoundIdleState(this),
    preflop: new RoundPreflopState(this),
    flop: new RoundFlopState(this),
    turn: new RoundTurnState(this),
    river: new RoundRiverState(this),
    showdown: new RoundShowdownState(this)
  };

  private deck: IDeck = new Deck();

  private players: IPlayer[];

  private bank: number = 0;

  constructor(private readonly config: IRoundConfig) {
    this.players = [...this.config.table.getPlayers()];
    this.state = new RoundIdleState(this);
  }

  public start() {
    if (!(this.state instanceof RoundIdleState)) {
      throw new Error("Round is not finished yet");
    }

    this.state.activate();
  }

  public setState(state: IRoundState): void {
    this.state = state;
    this.state.activate();
  }

  public getStates(): IRoundStates {
    return this.states;
  }

  public setTradeResult(tradeResult: ITradingResult): void {
    this.players = tradeResult.players;
    this.bank += tradeResult.bank;
  }

  public getPlayers(): IPlayer[] {
    return this.config.table.getPlayers();
  }

  public getDeck(): IDeck {
    return this.deck;
  }

  public getTable(): ITable {
    return this.config.table;
  }

  public getBank(): number {
    return this.bank;
  }

  public addToBank(value: number): void {
    this.bank += value;
  }

  public trade(): void {
    const trading = new Trading({
      players: this.getPlayers(),
      blind: this.state instanceof RoundPreflopState
    });

    const tradingResultPromise = trading.start();

    tradingResultPromise.then(tradingResult => {
      this.setTradeResult(tradingResult);
      this.state.process();
    });
  }

  public isActive(): boolean {
    return !(this.state instanceof RoundIdleState);
  }
}
