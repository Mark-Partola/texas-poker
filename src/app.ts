import { config } from "dotenv";
import { Game } from "./model/game";
import { User } from "./model/user/user";
import { Socket } from "./controller/socket";
import { UserFactory } from "./model/user/user-factory";

config({ path: __dirname + "/../.env" });

const game = new Game({
  usersCount: 4
});

const socket = new Socket(new UserFactory());

socket.listen();

socket.on("user", params => {
  console.log(params);
});

socket.on("command", (params: { user: IUser; command: { type: string } }) => {
  if (params.command.type === "join") {
    game.addUser(params.user);
  }
});
