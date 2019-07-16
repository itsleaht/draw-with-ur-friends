import { Socket } from 'socket.io';

import { Events, IUserNameEvent, SocketEvents } from './../events';

import { addLog } from './../helpers/Utils';
import UserManager from './../managers/UserManager';

interface IUserHandler {
  socket: Socket;
}

export default class UserHandler {
  public static handle(handler: IUserHandler): void {
    const socket = handler.socket;

    socket.on(Events.UserName, (event: IUserNameEvent) => {
      UserManager.getUser(event.id)!.setName(event.name);
      addLog('on', Events.UserName, JSON.stringify(UserManager.getUser(event.id)));
    });

    socket.on(SocketEvents.Disconnect, () => {
      const user = UserManager.getUser(socket.id);
      const rooms = user!.getRooms();

      for (const [id, room] of rooms.entries()) {
        socket.leave(id);
        user!.removeFromRoom(id);
        room.removeUser(socket.id);
      }

      addLog('on', SocketEvents.Disconnect, `User ${socket.id} - Disconnected`);
    });
  }
}
