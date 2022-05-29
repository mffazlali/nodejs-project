import {Schema} from "mongoose";

export let MessageSchema = new Schema<MessageModel>({
    id: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    text: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    createdAt: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
});

export class MessageModel {
    constructor(public id: string, public readonly from: string, public readonly text: string, public readonly createdAt: number, public readonly latitude = 0, public readonly longitude = 0) {
    }
}