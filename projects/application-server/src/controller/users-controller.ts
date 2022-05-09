import {UserType} from "../models";
import {ControllerImpl} from "./controller-impl";

export class UsersController extends ControllerImpl<UserType> {
    constructor() {
        super('Users');
    }
}



