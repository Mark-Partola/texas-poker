interface ICard {
  suit: number;
  value: number;
}

interface IUser {
  readonly id: string;
}

interface ITradingCheckAction {
  type: "check";
}

interface ITradingFoldAction {
  type: "fold";
}

interface ITradingRaiseAction {
  type: "raise";
  payload: {
    value: number;
  };
}

type ITradingAction =
  | ITradingCheckAction
  | ITradingFoldAction
  | ITradingRaiseAction;

interface IPlayer {
  readonly id: string;
  acceptTrade(availableActions: string[]): Promise<ITradingAction>;
  setHand(cards: ICard[]): void;
  trade(command: ITradingAction): void;
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
  start(): Promise<ITradingResult>;
}

interface ITradingResult {
  players: IPlayer[];
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
  trade(): Promise<ITradingResult>;
}
