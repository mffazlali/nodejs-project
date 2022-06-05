import {IController} from "./";
import {UserModel, MessageModel, SchemasModel} from "../models";
import {MongooseConnectionDb} from "../db/mongooseConnection-db";
import {model} from 'mongoose';

export class ControllerImpl<Type extends UserModel | MessageModel> implements IController<Type> {
    private readonly collectionName: string;

    protected mongooseConnectionDb: MongooseConnectionDb;

    protected entityModel;

    constructor(collectionName: string) {
        const schemasModel: any = SchemasModel;
        this.mongooseConnectionDb = MongooseConnectionDb.getInstance('TodoApp');
        this.collectionName = collectionName;
        // const entityModelTemp = mongoose.model<Type>(this.collectionName)
        // if (entityModelTemp)
        //     this.entityModel = entityModelTemp
        // else
        //     this.entityModel = model<Type>(this.collectionName, schemasModel[this.collectionName]);
        this.entityModel = model<Type>(this.collectionName, schemasModel[this.collectionName]);

    }

    readAll = async () => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.find();
        await this.mongooseConnectionDb.close();
        return (result as unknown as Type[]);
    }

    read = async (id: string) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.findOne({id});
        await this.mongooseConnectionDb.close();
        return (result as unknown as Type);
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
        const result = await this.entityModel.findOneAndUpdate({id: dataType.id}, {$set: dataType}, {new: true});
        await this.mongooseConnectionDb.close();
        return result;
    }

    delete = async (id: string) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.findOneAndDelete({id});
        await this.mongooseConnectionDb.close();
        return Promise.resolve(result);
    }

}