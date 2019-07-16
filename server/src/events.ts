const events = {
  CHAT_USER_MESSAGE: 'chat:message',
  ROOMS_GET: 'rooms:get',
  ROOM_CREATE: 'room:create',
  ROOM_DEFAULT: 'room:default',
  ROOM_JOIN: 'room:join',
  ROOM_JOINED: 'room:joined',
  SERVER_GET_EVENTS: 'server:get:events',
  USERS_GET: 'users:get',
  USER_CONNECTION: 'user:connection',
  USER_INFO: 'user:info',
  USER_LOGIN: 'user:login',
  USER_NAME: 'user:name',
};

export interface IChatUserMessageEvent {
  content: string;
  userId: string;
  roomId: string;
}

export default events;
