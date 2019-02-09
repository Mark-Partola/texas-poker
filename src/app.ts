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

socket.on("disconnect", (params: { user: IUser }) => {
  const player = players.get(params.user.id);

  if (player) {
    game.removePlayer(player);
  }
});

socket.on("command", (params: { user: IUser; command: { type: string } }) => {
  if (params.command.type === "join") {
    const player = new Player({ user: params.user });

    players.set(params.user.id, player);

    game.addPlayer(player);
  } else if (["check", "fold"].includes(params.command.type)) {
    const player = players.get(params.user.id);

    if (player) {
      player.trade(params.command as ITradingAction);
    }
  }
});
