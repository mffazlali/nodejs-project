import {MessageModel, UserModel} from "../models";
import {SocketIO} from "./socketIO";
import moment from "moment";

export class UserSocketIO extends SocketIO {

    join = () => {
        this.socketIO.socket.on('join', async (params: UserModel, callback: any) => {
            params.id = this.socketIO.socket.id;
            await this.userController.delete(params.id);
            await this.userController.create(params);
            this.socketIO.socket.join([params.room, this.socketIO.socket.id]);
            let usersRoom = await this.userController.readAllByRoom(params.room)
            this.socketIO.io.to(params.room).emit('usersRoom', {user: params, usersRoom});
            this.socketIO.io.to(this.socketIO.socket.id).emit('newMessage', new MessageModel(params.id, 'مدیر', `به وب چت خوش آمدید`, moment().valueOf()));
            this.socketIO.socket.broadcast.to(params.room).emit('newMessage', new MessageModel(params.id, 'مدیر', `${params.name} اضافه شد`, moment().valueOf()));
            callback();
        })
    }

    left = async () => {
        let user = await this.userController.read(this.socketIO.socket.id);
        if (user) {
            await this.userController.delete(this.socketIO.socket.id);
            let usersRoom = await this.userController.readAllByRoom(user.room)
            this.socketIO.io.to(user.room.toString()).emit('usersRoom', usersRoom);
            this.socketIO.io.to(user.room).emit('newMessage', new MessageModel(this.socketIO.socket.id, 'مدیر', `${user.name} ترک کرد!`, moment().valueOf()));
        }
    }
}