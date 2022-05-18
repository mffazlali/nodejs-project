import {IActionModel} from "../models";
import {ControllerMongooseImpl} from "./controller-mongoose-impl";

export class ActionMongooseController extends ControllerMongooseImpl<IActionModel, any, any> {
    constructor() {
        super('Action');
    }
}
