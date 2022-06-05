import {Schema} from "mongoose";

export let UserSchema = new Schema<UserModel>({
    id: {
        type: String,
        required: true,
        minlength: 11,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 1,
    }
});


export class UserModel {
    constructor(public id: string, public name: string, public password: String, public status?: number) {
    }
}