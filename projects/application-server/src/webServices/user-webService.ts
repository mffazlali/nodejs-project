import {UserMongooseController} from '../controller'
import {ObjectId} from "mongodb";
import {authenticate} from "./middlewares";
import {ResultModel} from "../models/result-model";
import {Router} from 'express';
import _ from "lodash";

export class UserWebService {
    private userMongooseController: UserMongooseController;
    public readonly router: Router;

    constructor() {
        this.userMongooseController = new UserMongooseController();
        this.router = Router();
        this.authenticate();
        this.login();
        this.logout();
        this.fetchAll();
        this.fetch();
        this.insert();
        this.update();
        this.delete();
    }

    private authenticate = () => {
        this.router.get('/authenticate', authenticate, (req: any, res: any) => {
            let result: ResultModel = {
                result: req.user,
                responseMessage: 'عملیات با موفقیت انجام شد',
                responseCode: 0
            };
            res.send(result);
        })
    }

    private login = () => {
        this.router.post('/login', (req: any, res: any) => {
            let result: ResultModel;
            const body = _.pick(req.body, ['email', 'password']);
            this.userMongooseController.createToken(body.email, body.password).then(rs => {
                result = {
                    result: rs,
                    responseMessage: 'عملیات با موفقیت انجام شد',
                    responseCode: 0
                };
                res.send(result);
            }).catch((err: Error) => {
                result = {result: err.name, responseMessage: err.message, responseCode: 400};
                res.status(400).send(result);
            })
        });
    }

    private logout = () => {
        this.router.delete('/logout', authenticate, (req: any, res: any) => {
            let result: ResultModel;
            debugger
            this.userMongooseController.deleteTokens(req.headers['x-auth'], req.user).then(rs => {
                result = {
                    result: rs,
                    responseMessage: 'عملیات با موفقیت انجام شد',
                    responseCode: 0
                };
                res.send(result);
            }).catch((err: Error) => {
                result = {result: err.name, responseMessage: err.message, responseCode: 400};
                res.status(400).send(result);
            })
        });
    }


    private fetchAll = () => {
        this.router.get('/fetchall', (req, res) => {
            let result: ResultModel;
            this.userMongooseController.readAll().then(rs => {
                result = {
                    result: rs,
                    responseMessage: 'عملیات با موفقیت انجام شد',
                    responseCode: 0
                };
                res.send(result);
            }).catch((err: Error) => {
                result = {result: err.name, responseMessage: err.message, responseCode: 400};
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
            this.userMongooseController.read(req.query).then(rs => {
                result = {
                    result: rs,
                    responseMessage: 'عملیات با موفقیت انجام شد',
                    responseCode: 0
                };
                res.send(result);
            }).catch((err: Error) => {
                result = {result: err.name, responseMessage: err.message, responseCode: 400};
                res.status(400).send(result);
            })
        })
    }

    private insert = () => {
        this.router.post('/insert', (req, res) => {
            let result: ResultModel;
            this.userMongooseController.create(req.body).then(rs => {
                result = {
                    result: this.userMongooseController.toJson(rs.data),
                    responseMessage: 'عملیات با موفقیت انجام شد',
                    responseCode: 0
                };
                res.header('x-auth', rs.token).send(result);
            }).catch((err: Error) => {
                result = {result: err.name, responseMessage: err.message, responseCode: 400};
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
                this.userMongooseController.update(req.body).then(rs => {
                    result = {
                        result: rs,
                        responseMessage: 'عملیات با موفقیت انجام شد',
                        responseCode: 0
                    };
                    res.send(result);
                }).catch((err: Error) => {
                    result = {result: err.name, responseMessage: err.message, responseCode: 400};
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
                this.userMongooseController.delete(new ObjectId(id)).then(rs => {
                    result = {
                        result: rs,
                        responseMessage: 'عملیات با موفقیت انجام شد',
                        responseCode: 0
                    };
                    res.send(result);
                }).catch((err: Error) => {
                    result = {result: err.name, responseMessage: err.message, responseCode: 400};
                    res.status(400).send(result);
                })
            }
        })
    }
}