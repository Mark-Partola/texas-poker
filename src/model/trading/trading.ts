interface ITradingProps {
  users: IUser[];
}

export class Trading implements ITrading {
  constructor(private readonly config: ITradingProps) {}

  public start(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
}
