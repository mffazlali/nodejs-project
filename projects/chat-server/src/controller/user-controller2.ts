import {UserModel} from "../models";
import {ControllerImpl} from "./";

export class UserController2 extends ControllerImpl<UserModel> {

    constructor() {
        super('User');
    }

    readAllByRoom = async (room: string) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.find({room});
        await this.mongooseConnectionDb.close();
        return (result as unknown as UserModel[]);
    }
}