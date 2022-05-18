import {ObjectId} from "mongodb";
import {Schema} from "mongoose";

export interface IActionModel {
    _id?: ObjectId,
    text: string,
    completed: boolean,
}

export let ActionSchema = new Schema<IActionModel>({
    text: {
        type: String,
        required: true,
        minLength: 2,
        trim: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    }
})