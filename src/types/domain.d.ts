interface ICard {
  suit: number;
  value: number;
}

interface IUser {
  getId(): string;
  setHand(cards: ICard[]): void;
}

interface IUserFactory {
  produce(): IUser;
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

interface ITrading {
  start(): Promise<void>;
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
  trade(): Promise<void>;
}
