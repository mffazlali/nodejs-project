import {ControllerImpl} from "./controller-impl";
import {MessageModel} from "../models";

export class MessageController extends ControllerImpl<MessageModel> {
    constructor() {
        super('Message');
    }

    readAllById = async (id: String) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.find({id});
        await this.mongooseConnectionDb.close();
        return result;
    }

}