import {ActionType} from "../models";
import {ControllerMongooseImpl} from "./controller-mongoose-impl";

export class ActionMongooseController extends ControllerMongooseImpl<ActionType> {
    constructor() {
        super('Action');
    }
}
