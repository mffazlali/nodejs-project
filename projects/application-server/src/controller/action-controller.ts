import {ControllerImpl} from "./controller-impl";
import {IActionModel} from "../models";

export class ActionController extends ControllerImpl<IActionModel> {
    constructor() {
        super('actions');
    }
}
