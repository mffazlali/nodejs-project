import {MessageModel, UserModel} from "../models";
import {SocketIO} from "./socketIO";
import moment from "moment";

export class UserSocketIO extends SocketIO {

    private user: UserModel = new UserModel('', '', '');

    login = () => {
        this.socketIO.socket.on('login', async (params: UserModel, callback: any) => {
            this.user = params;
            params.status = 1
            await this.userController.updateStatus(params)
            let users = await this.userController.readAll().then(user => {
                return user
            });
            let usersId = users.map(user => user.id)
            this.socketIO.socket.join(usersId);
            this.socketIO.io.to(params.id).emit('users', users);
            let messages = await this.messageController.readAllById(params.id);
            if (messages.length > 0) {
                messages = messages.sort((a, b) => a.createdAt - b.createdAt);
                this.socketIO.io.to(this.socketIO.socket.id).emit('messages', messages);
            } else {
                this.socketIO.io.to(this.socketIO.socket.id).emit('messages', [new MessageModel(params.id, 'مدیر', `به وب چت خوش آمدید`, moment().valueOf())]);
                this.socketIO.socket.broadcast.to(usersId).emit('messages', [new MessageModel(params.id, 'مدیر', `${params.name} اضافه شد`, moment().valueOf())]);
            }
            callback();
        })
    }

    logout = () => {
        this.socketIO.socket.on('logout', async (user: UserModel) => {
            user.status = 2;
            await this.userController.updateStatus(this.user);
            let users = await this.userController.readAll();
            this.socketIO.io.to(this.socketIO.socket.id).emit('users', users);
            this.socketIO.io.to(this.socketIO.socket.id).emit('messages', new MessageModel(this.socketIO.socket.id, 'مدیر', `${user.name} ترک کرد!`, moment().valueOf()));
        });
    }
}