import {Express, Router} from 'express';
import {ActionMongooseController} from '../controller'
import {ObjectId} from "mongodb";
import {ResultModel} from "../models/result-model";

export class ActionWebService {
    public readonly router: Router;
    private actionMongooseController: ActionMongooseController;

    constructor() {
        this.router = Router();
        this.actionMongooseController = new ActionMongooseController();
        this.fetchAll();
        this.fetch();
        this.insert();
        this.update();
        this.delete();
    }

    private fetchAll = () => {
        this.router.get('/fetchall', (req, res) => {
            let result: ResultModel;
            this.actionMongooseController.readAll().then(r => {
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
            this.actionMongooseController.read(req.query).then(r => {
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
            this.actionMongooseController.create(req.body).then(r => {
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

    private update = () => {
        this.router.patch('/update', (req, res) => {
            let result: ResultModel;
            if (!ObjectId.isValid(req.body._id)) {
                result = {result: 'id error', responseMessage: 'id is invalid', responseCode: 400};
                res.status(400).send(result);
            } else {
                this.actionMongooseController.update(req.body).then(r => {
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
                this.actionMongooseController.delete(new ObjectId(id)).then(r => {
                    result = {
                        result: r,
                        responseMessage: 'عملیات با موفقیت انجام شد',
                        responseCode: 0
                    };
                }).catch((e: Error) => {
                    result = {result: e.name, responseMessage: e.message, responseCode: 400};
                    res.status(400).send(result);
                })
            }
        })
    }

}