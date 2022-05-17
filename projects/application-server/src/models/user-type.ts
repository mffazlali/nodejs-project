import {ObjectId} from "mongodb";

export type UserType = {
    _id?: ObjectId
    email: string,
    password: string,
    tokens: [{
        access: string,
        token: string
    }]
}