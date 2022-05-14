import {IController} from "./IController";
import MongodbConnectionDb from "../db/mongodbConnection-db";
import {ObjectId} from "mongodb";
import {ActionType, UserType} from "../models";

export class ControllerImpl<Type extends ActionType | UserType> implements IController<Type> {
    private collectionName;

    private mongodbConnectionDb: MongodbConnectionDb;

    constructor(collectionName: string) {
        this.mongodbConnectionDb = MongodbConnectionDb.getInstance('TodoApp');
        this.collectionName = collectionName;
    }

    readAll = async () => {
        await this.mongodbConnectionDb.connect();
        const result = await this.mongodbConnectionDb.db.collection(this.collectionName).find().toArray();
        await this.mongodbConnectionDb.close();
        return result;
    }

    read = async (id: string) => {
        await this.mongodbConnectionDb.connect();
        const result = await this.mongodbConnectionDb.db.collection(this.collectionName).find({_id: new ObjectId(id)}).toArray();
        await this.mongodbConnectionDb.close();
        return result;
    }

    create = async (dataType: Type) => {
        await this.mongodbConnectionDb.connect();
        const result = await this.mongodbConnectionDb.db.collection(this.collectionName).insertOne(dataType);
        await this.mongodbConnectionDb.close();
        return result
    }

    update = async (dataType: Type) => {
        await this.mongodbConnectionDb.connect();
        const result = await this.mongodbConnectionDb.db.collection(this.collectionName).updateOne({_id: dataType._id}, {$set: dataType});
        await this.mongodbConnectionDb.close();
        return result;
    }

    delete = async (id: ObjectId) => {
        await this.mongodbConnectionDb.connect();
        const result = await this.mongodbConnectionDb.db.collection(this.collectionName).deleteOne({_id: id});
        await this.mongodbConnectionDb.close();
        return result;
    }
}