import {ControllerMongooseImpl} from "./controller-mongoose-impl";
import {IUserMethods, IUserModel, IUserStatics} from "../models";
import _ from "lodash";
import jwt from "jsonwebtoken";

export class UserMongooseController extends ControllerMongooseImpl<IUserModel, IUserMethods, IUserStatics> {
    constructor() {
        super('User');
    }

    override create = async (dataType: IUserModel) => {
        await this.mongooseConnectionDb.connect()
        const entity = new this.entityModel(dataType);
        await entity.save();
        let result = await entity.generateAuthToken();
        await this.mongooseConnectionDb.close();
        return result;
    }

    createToken = async (email: string, password: string) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.findByCredentials(email, password).then(user => {
            return user.generateAuthToken();
        });
        await this.mongooseConnectionDb.close();
        return result;
    }

    readByToken = (token: string) => {
        return this.entityModel.findByToken(token);
    }

    deleteTokens = async (token: string) => {
        await this.mongooseConnectionDb.connect()
        const result = await this.entityModel.findByToken(token).then(user => {
            if (!user) {
                return Promise.reject(new Error('token is not found'));
            }
            console.log('u',user)
            return user.removeTokens(token);
        })
        await this.mongooseConnectionDb.close();
        return result;
    }

    toJson = (userData: IUserModel) => {
        return _.pick(userData, ['_id', 'email']);
    }

}