interface ICard {
  suit: number;
  value: number;
}

interface IUser {
  setHand(cards: ICard[]): void;
}

interface IRoundState {
  activate(): void;
  process(): void;
}

interface IRoundStates {
  idle: IRoundState;
  preflop: IRoundState;
  flop: IRoundState;
  turn: IRoundState;
  river: IRoundState;
  showdown: IRoundState;
}

interface IRoundStateContext {
  setState(state: IRoundState): void;
  getStates(): IRoundStates;
  getUsers(): IUser[];
}
