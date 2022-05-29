import socketIO, {Socket} from 'socket.io'
import {Server} from "http";

export default class ConnectionSocketIO {
    public readonly io: socketIO.Server;
    private static instance: ConnectionSocketIO

    private constructor(server: Server, origin: string) {
        this.io = new socketIO.Server(server, {cors: {origin}});
    }

    static getInstance(server: Server, origin: string) {
        if (ConnectionSocketIO.instance) {
            return this.instance
        }
        this.instance = new ConnectionSocketIO(server, origin);
        return this.instance;
    }

    connect = (fn: (socket: Socket) => void) => {
        this.io.on('connection', fn)
    }

    disconnect(fn: (socket: Socket) => void) {
        this.io.on('disconnect', (fn));
    }
}