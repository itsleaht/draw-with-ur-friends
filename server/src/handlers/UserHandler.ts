import { Socket } from 'socket.io';

import { Events, IUserNameEvent, SocketEvents } from './../events';

import { addLog } from './../helpers/Utils';
import RoomManager from './../managers/RoomManager';
import UserManager from './../managers/UserManager';

interface IUserHandler {
  socket: Socket;
}

export default class UserHandler {
  public static handle(handler: IUserHandler): void {
    const socket = handler.socket;

    socket.on(Events.UserName, (event: IUserNameEvent) => {
      UserManager.getUser(event.id)!.setName(event.name);
      const user = UserManager.getUser(socket.id);
      const rooms = user!.getRooms();

      if (user && rooms)  {
        for (const [id, room] of rooms.entries()) {
          room.updateUser(user);
          RoomManager.handleDelete(id);
        }
      }

      const userLog: any = UserManager.getUser(event.id)!.serialize;
      addLog('on', Events.UserName, JSON.stringify({id: userLog.id, name: userLog.name}));
    });

    socket.on(SocketEvents.Disconnect, () => {
      const user = UserManager.getUser(socket.id);
      const rooms = user!.getRooms();

      for (const [id, room] of rooms.entries()) {
        socket.leave(id);
        user!.removeFromRoom(id);
        room.removeUser(socket.id);

        RoomManager.handleDelete(id);
      }

      addLog('on', SocketEvents.Disconnect, `User ${socket.id} - Disconnected`);
    });
  }
}
