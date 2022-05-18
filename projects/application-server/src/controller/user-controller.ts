import {IUserModel} from "../models";
import {ControllerImpl} from "./controller-impl";

export class UserController extends ControllerImpl<IUserModel> {
    constructor() {
        super('users');
    }
}



