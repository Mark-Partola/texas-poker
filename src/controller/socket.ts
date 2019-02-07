import * as events from "events";
import * as WebSocket from "ws";

export class Socket extends events.EventEmitter {
  private server: WebSocket.Server;

  constructor(private readonly userFactory: IUserFactory) {
    super();

    this.server = new WebSocket.Server({
      port: Number(process.env.PORT)
    });
  }

  public listen() {
    this.server.on("connection", this.handleClient.bind(this));
  }

  private handleClient(client: WebSocket) {
    const user = this.userFactory.produce();

    this.emit("user", { user });

    client.on("message", (message: WebSocket.Data) => {
      try {
        const command = JSON.parse(message.toString());
        this.emit("command", { user, command });
      } catch {
        client.send(
          JSON.stringify({
            success: false,
            message: "Incorrect command"
          })
        );
      }
    });

    client.on("close", () => {
      this.emit("disconnect", { user });
    });
  }
}
