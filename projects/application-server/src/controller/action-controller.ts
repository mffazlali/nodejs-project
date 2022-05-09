import {ActionType} from "../models";
import {ControllerImpl} from "./controller-impl";

export class ActionController extends ControllerImpl<ActionType> {
    constructor() {
        super('Action');
    }
}
