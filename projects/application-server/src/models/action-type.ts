import {ObjectId} from "mongodb";

export type ActionType = {
    _id?: ObjectId,
    text: string,
    completed: boolean,
}