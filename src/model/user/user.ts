import { v4 } from "uuid";

export class User implements IUser {
  public readonly id: string = v4();
}
