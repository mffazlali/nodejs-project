import {Express} from 'express';
import {UserMongooseController} from '../controller'
import {ObjectId} from "mongodb";
import {authenticate} from "./middlewares";
import {ResultModel} from "../models/result-model";
import {Router} from 'express';

export class UserWebService {
    private userMongooseController: UserMongooseController;
    public readonly router: Router;

    constructor() {
        this.userMongooseController = new UserMongooseController();
        this.router = Router();
        this.authenticateUser();
        this.fetchAll();
        this.fetch();
        this.insert();
        this.update();
        this.delete();
    }

    private authenticateUser = () => {
        this.router.get('/authenticateuser', authenticate, (req: any, res: any) => {
            res.send(req.user);
        })
    }

    private fetchAll = () => {
        this.router.get('/fetchall', (req, res) => {
            let result: ResultModel;
            this.userMongooseController.readAll().then(r => {
                result = {
                    result: r,
                    responseMessage: 'عملیات با موفقیت انجام شد',
                    responseCode: 0
                };
                res.send(result);
            }).catch((e: Error) => {
                result = {result: e.name, responseMessage: e.message, responseCode: 400};
                res.status(400).send(result);
            })
        })
    }

    private fetch = () => {
        this.router.get('/fetch', (req, res) => {
            let result: ResultModel;
            if (!ObjectId.isValid(req.query['_id'] as string)) {
                res.status(400).send();
            }
            this.userMongooseController.read(req.query).then(r => {
                result = {
                    result: r,
                    responseMessage: 'عملیات با موفقیت انجام شد',
                    responseCode: 0
                };
                res.send(result);
            }).catch((e: Error) => {
                result = {result: e.name, responseMessage: e.message, responseCode: 400};
                res.status(400).send(result);
            })
        })
    }

    private insert = () => {
        this.router.post('/insert', (req, res) => {
            let result: ResultModel;
            this.userMongooseController.create(req.body).then(r => {
                result = {
                    result: this.userMongooseController.toJson(r.data),
                    responseMessage: 'عملیات با موفقیت انجام شد',
                    responseCode: 0
                };
                res.header('x-auth', r.token).send(result);
            }).catch((e: Error) => {
                result = {result: e.name, responseMessage: e.message, responseCode: 400};
                res.status(400).send(result);
            })
        })
    }

    private update = () => {
        this.router.patch('/update', (req, res) => {
            let result: ResultModel;
            if (!ObjectId.isValid(req.body._id)) {
                result = {result: 'id error', responseMessage: 'id is invalid', responseCode: 400};
                res.status(400).send(result);
            } else {
                this.userMongooseController.update(req.body).then(r => {
                    result = {
                        result: r,
                        responseMessage: 'عملیات با موفقیت انجام شد',
                        responseCode: 0
                    };
                    res.send(result);
                }).catch((e: Error) => {
                    result = {result: e.name, responseMessage: e.message, responseCode: 400};
                    res.status(400).send(result);
                })
            }
        })
    }

    private delete = () => {
        this.router.delete('/delete/:id', (req, res) => {
            let result: ResultModel;
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                result = {result: 'id error', responseMessage: 'id is invalid', responseCode: 400};
                res.status(400).send(result);
            } else {
                this.userMongooseController.delete(new ObjectId(id)).then(r => {
                        result = {
                            result: r,
                            responseMessage: 'عملیات با موفقیت انجام شد',
                            responseCode: 0
                        };
                        res.send(result);
                    }
                ).catch((e: Error) => {
                    result = {result: e.name, responseMessage: e.message, responseCode: 400};
                    res.status(400).send(result);
                })
            }
        })
    }
}