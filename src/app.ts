import { config } from "dotenv";
import { Game } from "./model/game";
import { Socket } from "./controller/socket";
import { UserFactory } from "./model/user/user-factory";
import { Player } from "./model/user/player";

config({ path: __dirname + "/../.env" });

const game = new Game({
  playersCount: 4
});

const socket = new Socket(new UserFactory());

socket.listen();

const players = new Map<string, IPlayer>();

socket.on("disconnect", params => {});

socket.on("command", (params: { user: IUser; command: { type: string } }) => {
  if (params.command.type === "join") {
    const player = new Player({ user: params.user });

    players.set(params.user.getId(), player);

    game.addPlayer(player);
  } else if (params.command.type === "check") {
    const player = players.get(params.user.getId());

    if (player) {
      player.check();
    }
  }
});
