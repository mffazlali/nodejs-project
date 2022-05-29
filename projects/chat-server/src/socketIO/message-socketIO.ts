import {MessageModel} from "../models";
import {SocketIO} from "./socketIO";

export class MessageSocketIO extends SocketIO {

    send = () => {
        this.socketIO.socket.on('createMessage', async (message: MessageModel, callback) => {
            let user = await this.userController.read(message.id);
            this.socketIO.io.to(user.room).emit('newMessage', new MessageModel(message.id, message.from, message.text, message.createdAt, message.latitude, message.longitude));
            // socket.broadcast.emit('newMessage', new MessageModel(`broadcast ${message.from}`, message.text, message.createdAt, message.latitude, message.longitude));
            callback();
        })
    }

}

