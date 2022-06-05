import {MessageController, UserController} from "../controller";
import {SocketIOModel} from "../models";

export class SocketIO {
    protected userController: UserController;
    protected messageController: MessageController;
    protected socketIO: SocketIOModel;

    constructor(socketIO: SocketIOModel) {
        this.userController = new UserController();
        this.messageController = new MessageController();
        this.socketIO = socketIO;
    }
}