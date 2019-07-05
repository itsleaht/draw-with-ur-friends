export class DrawServer {
  private io: SocketIO.Server;
  private port: string | number;
  private socket: SocketIO.Socket | null = null;

  constructor(io: SocketIO.Server, port: string | number) {
    this.io = io;
    this.port = port;
  }

  public connect(): void {
    this.io.on('connect', (socket: any) => {
      this.socket = socket;
      console.log('Connected client on port %s.', this.port);


      socket.on('disconnect', () => {
        console.log('Client disconnected');
        // todo : remove user from room & remove user from DrawServer.user
        // todo: emit user disconnect
      });
    });
  }
}
