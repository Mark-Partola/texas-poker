import { Table } from "../table";
import { User } from "../user";
import { RoundIdleState } from "./round-idle-state";
import { RoundPreflopState } from "./round-preflop-state";
import { RoundFlopState } from "./round-flop-state";
import { RoundTurnState } from "./round-turn-state";
import { RoundRiverState } from "./round-river-state";
import { RoundShowdownState } from "./round-showdown-state";

interface IRoundConfig {
  table: Table;
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

  constructor(private readonly config: IRoundConfig) {
    this.state = new RoundIdleState(this);
  }

  public start() {
    if (!(this.state instanceof RoundIdleState)) {
      throw new Error("Round is not finished yet");
    }

    this.state.process();
  }

  public setState(state: IRoundState): void {
    this.state = state;
    this.state.activate();
  }

  public getStates(): IRoundStates {
    return this.states;
  }

  public getUsers(): IUser[] {
    return this.config.table.getUsers();
  }

  public isActive(): boolean {
    return !(this.state instanceof RoundIdleState);
  }
}
