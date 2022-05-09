import {ObjectId} from "mongodb";

export type UserType = {
    _id?: ObjectId
    name: string,
    age: number,
    location: string
}