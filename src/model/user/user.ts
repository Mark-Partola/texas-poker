import { v4 } from "uuid";

export class User implements IUser {
  private uid: string = v4();

  public getId(): string {
    return this.uid;
  }
}
