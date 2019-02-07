interface ICard {
  suit: number;
  value: number;
}

interface IUser {
  setHand(cards: ICard[]): void;
}

interface IDeck {
  draw(): ICard;
  shuffle(): void;
}

interface ITable {
  addUser(user: IUser, placeIdx: number): void;
  removeUser(user: IUser): void;
  getUsers(): IUser[];
  clearCards(): void;
  addCards(cards: ICard[]): void;
  getCards(): ICard[];
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
  getDeck(): IDeck;
  getTable(): ITable;
}
