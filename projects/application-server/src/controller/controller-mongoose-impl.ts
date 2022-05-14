import {IController} from "./IController";
import {ActionType, schemaObject, UserType} from "../models";
import {mongoose, MongooseConnectionDb} from "../db/mongooseConnection-db";
import {Model, Schema} from "mongoose";
import {ObjectId} from "mongodb";

export class ControllerMongooseImpl<Type extends ActionType | UserType> implements IController<Type> {
    private readonly collectionName: string;

    private mongooseConnectionDb: MongooseConnectionDb;

    private readonly schemaObject: any;

    private readonly entityModel: Model<unknown, unknown, unknown, unknown>

    constructor(collectionName: string) {
        this.mongooseConnectionDb = MongooseConnectionDb.getInstance('TodoApp');
        this.collectionName = collectionName;
        this.schemaObject = schemaObject;
        if (!mongoose.models[this.collectionName]) {
            this.entityModel = mongoose.model(this.collectionName, new Schema(this.schemaObject[this.collectionName]));
        } else {
            this.entityModel = mongoose.models[this.collectionName]
        }
    }

    readAll = async () => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.find();
        await this.mongooseConnectionDb.close();
        return result;
    }

    read = async (objectId: any) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.find({_id: objectId?._id});
        await this.mongooseConnectionDb.close();
        return result;
    }

    create = async (dataType: Type) => {
        await this.mongooseConnectionDb.connect()
        const entity = new this.entityModel(dataType);
        const result = await entity.save()
        await this.mongooseConnectionDb.close();
        return result;
    }

    update = async (dataType: Type) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.updateOne({_id: dataType._id}, dataType);
        await this.mongooseConnectionDb.close();
        return result;
    }

    delete = async (objectId: ObjectId) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.deleteOne({_id: objectId});
        await this.mongooseConnectionDb.close();
        return result;
    }

    deleteAll = async () => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.deleteMany();
        await this.mongooseConnectionDb.close();
        return result;
    }


}