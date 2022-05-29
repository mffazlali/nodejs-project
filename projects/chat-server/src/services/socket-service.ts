import {Express} from "express";
import dotenv from "dotenv";
import http from 'http';
import ConnectionSocketIO from "../socketIO/connection-socketIO";
import {UserSocketIO} from "../socketIO/user-socketIO";
import {MessageSocketIO} from "../socketIO/message-socketIO";
import {SocketIOModel} from "../models";

export let SocketService = (app: Express) => {
    dotenv.config();
    const port = process.env.PORT || 3000;
    const server = http.createServer(app);
    let connectionSocketIO = ConnectionSocketIO.getInstance(server, 'http://localhost:4200');
    connectionSocketIO.connect((socket) => {
        let socketIO: SocketIOModel = {socket, io: connectionSocketIO.io};
        let userSocketIO = new UserSocketIO(socketIO);
        let messageSocketIO = new MessageSocketIO(socketIO);
        userSocketIO.join();
        messageSocketIO.send();
        connectionSocketIO.disconnect(() => {
            userSocketIO.left();
        })
    })
    server.listen(port, () => {
        console.log(`server run on port ${port}`)
    });
}