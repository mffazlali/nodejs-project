import {UserType} from "../models";
import {ControllerImpl} from "./controller-impl";

export class UserController extends ControllerImpl<UserType> {
    constructor() {
        super('users');
    }
}



