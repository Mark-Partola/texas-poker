import { Game } from "./model/game";
import { User } from "./model/user";

const game = new Game({
  usersCount: 4
});

const user = new User();
game.addUser(user, 1);

setTimeout(() => game.addUser(new User(), 0), 1000);

setTimeout(() => game.removeUser(user), 10000);

setTimeout(() => game.addUser(user, 2), 14000);
