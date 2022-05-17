import {UserMongooseController} from "../controller";
import {NextFunction} from "express";

let authenticate = (req: any, res: any, next: NextFunction) => {
    let userMongooseController = new UserMongooseController();
    const token = req.header('x-auth')!;
    userMongooseController.findByToken(token).then((r: any) => {
        if (!r) {
            return Promise.reject(r);
        }
        req.user = r;
        req.token = token
        next();
    }).catch((e: any) => {
        res.status(401).send(e);
    });
}

export {authenticate};