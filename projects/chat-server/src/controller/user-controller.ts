import {UserModel} from "../models";
import {ControllerImpl} from "./controller-impl";

export class UserController extends ControllerImpl<UserModel> {
    constructor() {
        super('User');
    }

    readByUser_PASS = async (user: any) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.findOne({name: user.name, password: user.password});
        await this.mongooseConnectionDb.close();
        return result;
    }

    updateStatus = async (user: UserModel) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.findOneAndUpdate({id: user.id}, {$set: {status: user.status}}, {new: true});
        await this.mongooseConnectionDb.close();
        return result;
    }

}



