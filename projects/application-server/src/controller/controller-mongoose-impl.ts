import {IController} from "./IController";
import {ActionType, entitySchema, UserType} from "../models";
import {mongoose, MongooseConnectionDb} from "../db/mongooseConnection-db";
import {Model, Schema} from "mongoose";
import {ObjectId} from "mongodb";
import {ResultModel} from "../models/result-model";

export class ControllerMongooseImpl<Type extends ActionType | UserType> implements IController<Type> {
    private readonly collectionName: string;

    protected mongooseConnectionDb: MongooseConnectionDb;

    protected readonly entityModel: Model<unknown, unknown, any, unknown>;

    constructor(collectionName: string) {
        let schemaObjectTemp: any = entitySchema;
        this.mongooseConnectionDb = MongooseConnectionDb.getInstance('TodoApp');
        this.collectionName = collectionName;
        if (!mongoose.models[this.collectionName]) {
            this.entityModel = mongoose.model(this.collectionName, schemaObjectTemp[this.collectionName]);
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
        const result = await this.entityModel.findOneAndUpdate({_id: dataType._id}, {$set: dataType}, {new: true});
        await this.mongooseConnectionDb.close();
        return result;
    }

    delete = async (objectId: ObjectId) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.findOneAndDelete({_id: objectId});
        await this.mongooseConnectionDb.close();
        return Promise.resolve(result);
    }

    deleteAll = async () => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.deleteMany();
        await this.mongooseConnectionDb.close();
        return result;
    }


}