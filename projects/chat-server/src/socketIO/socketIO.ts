import {UserController} from "../controller";
import {SocketIOModel} from "../models";

export class SocketIO {
    protected userController: UserController;
    protected socketIO: SocketIOModel;

    constructor(socketIO: SocketIOModel) {
        this.userController = new UserController();
        this.socketIO = socketIO;
    }
}