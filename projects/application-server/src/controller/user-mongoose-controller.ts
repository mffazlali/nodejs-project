import {ControllerMongooseImpl} from "./controller-mongoose-impl";
import {entitySchema, UserType} from "../models";
import _ from "lodash";
import jwt from "jsonwebtoken";

export class UserMongooseController extends ControllerMongooseImpl<UserType> {
    constructor() {
        super('User');
    }

    override create = async (dataType: UserType) => {
        await this.mongooseConnectionDb.connect()
        const entity = new this.entityModel(dataType);
        await entity.save();
        let result = await entity.generateAuthToken();
        await this.mongooseConnectionDb.close();
        return result;
    }

    toJson = (userData: UserType) => {
        return _.pick(userData, ['_id', 'email']);
    }

    findByToken = async (token: string) => {
        await this.mongooseConnectionDb.connect()
        let decoded: any;
        try {
            decoded = jwt.verify(token, 'ehsan');
        } catch (e) {

        }
        const result = await this.entityModel.findOne({
            '_id': decoded?._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });
        await this.mongooseConnectionDb.close();
        return result;
    }
}
