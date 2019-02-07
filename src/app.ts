import { Game } from "./model/game";
import { User } from "./model/user";

const game = new Game({
  usersCount: 4
});

game.addUser(new User(), 1);

setTimeout(() => game.addUser(new User(), 0), 1000);
setTimeout(() => game.addUser(new User(), 2), 2000);
setTimeout(() => game.addUser(new User(), 3), 3000);
