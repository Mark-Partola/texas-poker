import { config } from "dotenv";
import { Game } from "./model/game";
import { User } from "./model/user/user";
import { Socket } from "./controller/socket";
import { UserFactory } from "./model/user/user-factory";

config({ path: __dirname + "/../.env" });

const game = new Game({
  usersCount: 4
});

const user = new User();
game.addUser(user, 1);

setTimeout(() => game.addUser(new User(), 0), 1000);

setTimeout(() => game.removeUser(user), 10000);

setTimeout(() => game.addUser(user, 2), 14000);

new Socket(new UserFactory());
