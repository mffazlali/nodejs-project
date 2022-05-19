import {UserMongooseController} from "../controller";
import {NextFunction} from "express";
import {ResultModel} from "../models/result-model";

let authenticate = (req: any, res: any, next: NextFunction) => {
    let userMongooseController = new UserMongooseController();
    const token = req.header('x-auth')!;
    userMongooseController.readByToken(token).then((rs: any) => {
        if (!rs) {
            return Promise.reject(rs);
        }
        req.user = rs;
        req.token = token
        next();
    }).catch((err: Error) => {
        let result: ResultModel = {result: err.name, responseMessage: err.message, responseCode: 401};
        res.status(401).send(result);
    });
}

export {authenticate};