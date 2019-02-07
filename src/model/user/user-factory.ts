import { User } from "./user";

export class UserFactory implements IUserFactory {
  produce() {
    return new User();
  }
}
