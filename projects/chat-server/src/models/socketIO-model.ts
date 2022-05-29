import {Server, Socket} from "socket.io";

export interface SocketIOModel {
    io: Server,
    socket: Socket
}