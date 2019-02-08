interface ICard {
  suit: number;
  value: number;
}

interface IUser {
  getId(): string;
}

interface IPlayer {
  getId(): string;
  acceptTrade(): Promise<void>;
  setHand(cards: ICard[]): void;
  check(): void;
}

interface IUserFactory {
  produce(): IUser;
}

interface IDeck {
  draw(): ICard;
  shuffle(): void;
}

interface ITable {
  addPlayer(player: IPlayer, placeIdx: number): void;
  removePlayer(player: IPlayer): void;
  getPlayers(): IPlayer[];
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
  getPlayers(): IPlayer[];
  getDeck(): IDeck;
  getTable(): ITable;
  trade(): Promise<void>;
}
