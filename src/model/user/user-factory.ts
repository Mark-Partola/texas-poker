import { User } from "./user";

export class UserFactory implements IUserFactory {
  produce(): IUser {
    return new User();
  }
}
