import express = require('express');
import { createServer, Server } from 'http';
import socketIO  = require('socket.io');

export class DrawServerManager {
  public static readonly PORT: number = 3030;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.app = this.createApp();
    this.server = this.createServer();
    this.io = this.createSockets();

    this.port = '';
    this.createConfig();
    this.listen();
  }

  public getApp(): express.Application {
    return this.app;
  }

  private createApp(): express.Application {
    return express();
  }

  private createServer(): Server {
    return createServer(this.app);
  }

  private createConfig(): void {
    this.port = process.env.PORT || DrawServerManager.PORT;
  }

  private createSockets(): SocketIO.Server {
    return socketIO(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });
  }


}

export default DrawServerManager;
