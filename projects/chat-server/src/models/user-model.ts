import {Schema} from "mongoose";

export let UserSchema = new Schema<UserModel>({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    room: {
        type: String,
        required: true,
        trim: true,
    },
});

export class UserModel {
    constructor(public id: string, public name: string, public room: string) {
    }
}