import * as WebSocket from "ws";

export class Socket {
  private server: WebSocket.Server;

  constructor(private readonly userFactory: IUserFactory) {
    this.server = new WebSocket.Server({
      port: Number(process.env.PORT)
    });

    this.subscribe();
  }

  private subscribe() {
    this.server.on("connection", this.handleClient.bind(this));
  }

  private handleClient(client: WebSocket) {
    const user = this.userFactory.produce();

    client.on("message", (message: WebSocket.Data) => {
      console.log(user.getId(), message);
    });
  }
}
