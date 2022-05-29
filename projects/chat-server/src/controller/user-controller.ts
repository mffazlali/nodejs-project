import {UserModel} from "../models";
import {ControllerMongooseImpl} from "./";

export class UserController extends ControllerMongooseImpl<UserModel> {

    constructor() {
        super('User');
    }

    readAllByRoom = async (room: string) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.find({room});
        await this.mongooseConnectionDb.close();
        return (result as unknown as UserModel[]);
    }

    // public users: UserModel[];
    //
    // constructor() {
    //     this.users = [];
    // }
    //
    // getAllByRoom = (room: string) => {
    //     return this.users.filter(user => user.room === room);
    //     // return users.map(user => user.name);
    // }
    //
    // getById = (id: string) => {
    //     return this.users.filter(user => user.id === id)[0]
    // }
    //
    // add = (user: UserModel) => {
    //     this.users.push(user);
    //     return user;
    // }
    //
    // remove(id: string) {
    //     let user = this.getById(id);
    //     if (user) {
    //         this.users = this.users.filter(user => user.id !== id);
    //     }
    //     return user;
    // }
}