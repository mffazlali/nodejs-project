import {ControllerMongooseImpl} from "./controller-mongoose-impl";
import {UserType} from "../models";

export class UserMongooseController extends ControllerMongooseImpl<UserType> {
    constructor() {
        super('User');
    }
}
