import {Express} from "express";
import cors from 'cors';
import dotenv from "dotenv";
import http from 'http';
import ConnectionSocketIO from "../socketIO/connection-socketIO";
import {UserSocketIO} from "../socketIO/user-socketIO";
import {MessageSocketIO} from "../socketIO/message-socketIO";
import {SocketIOModel} from "../models";
import {UserWebService} from "../webServices";
import bodyParser from "body-parser";

export let SocketService = (app: Express) => {
    dotenv.config();
    const port = process.env.PORT || 3000;
    let userWebService = new UserWebService();
    app.use(bodyParser.json());
    app.use(cors({
        origin: 'http://localhost:4200'
    }));
    app.use('/user', userWebService.router);

    const server = http.createServer(app);
    let connectionSocketIO = ConnectionSocketIO.getInstance(server, 'http://localhost:4200');
    connectionSocketIO.connect((socket) => {
        let socketIO: SocketIOModel = {socket, io: connectionSocketIO.io};
        let userSocketIO = new UserSocketIO(socketIO);
        let messageSocketIO = new MessageSocketIO(socketIO);
        userSocketIO.login();
        userSocketIO.logout();
        messageSocketIO.send();
        connectionSocketIO.disconnect(() => {
        })
    })

    server.listen(port, () => {
        console.log(`server run on port ${port}`)
    });
}