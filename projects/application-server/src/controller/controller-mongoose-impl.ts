import {IController} from "./IController";
import {IActionModel, IUserMethods, IUserModel, IUserStatics, SchemasModel} from "../models";
import {MongooseConnectionDb} from "../db/mongooseConnection-db";
import {model} from 'mongoose'
import {ObjectId} from "mongodb";

export class ControllerMongooseImpl<Type extends IActionModel | IUserModel, Methods extends IUserMethods, Statics extends IUserStatics> implements IController<Type> {
    private readonly collectionName: string;

    protected mongooseConnectionDb: MongooseConnectionDb;

    protected entityModel;

    constructor(collectionName: string) {
        const schemasModel: any = SchemasModel;
        this.mongooseConnectionDb = MongooseConnectionDb.getInstance('TodoApp');
        this.collectionName = collectionName;
        this.entityModel = model<Type, Statics, Methods>(this.collectionName, schemasModel[this.collectionName]);
        // if (!mongoose.models[this.collectionName]) {
        //     this.entityModel = model<Type,Statics,Methods>(this.collectionName, schemasModel[this.collectionName]);
        // } else {
        //     this.entityModel = models[this.collectionName] as Model<Type,Statics,Methods>
        // }
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