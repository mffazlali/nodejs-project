import {UserController} from '../controller'
import {ResultModel} from "../models";
import {Router} from 'express';

export class UserWebService {
    private userController: UserController;
    public router: Router;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.fetchAll();
        this.fetch();
        this.insert();
        this.update();
        this.delete();
        this.fetchByUser_Pass();
        this.updateStatus();
    }

    private fetchAll = () => {
        this.router.get('/fetchall', (req, res) => {
            let result: ResultModel;
            this.userController.readAll().then(rs => {
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
            let id = req.query['id'] as string;

            this.userController.read(id).then(rs => {
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

    private fetchByUser_Pass = () => {
        this.router.get('/fetchbyuserpass', (req, res) => {
            let result: ResultModel;
            let user = req.query;
            this.userController.readByUser_PASS(user).then(rs => {
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
            this.userController.create(req.body).then(rs => {
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

    private update = () => {
        this.router.patch('/update', (req, res) => {
            let result: ResultModel;
            this.userController.update(req.body).then(rs => {
                result = {
                    result: rs,
                    responseMessage: 'عملیات با موفقیت انجام شد',
                    responseCode: 0
                };
                res.send(result);
            }).catch((err: Error) => {
                result = {result: err.name, responseMessage: err.message, responseCode: 400};
                res.status(400).send(result);
            });
        })
    }

    private updateStatus = () => {
        this.router.patch('/updatestatus', (req, res) => {
            let result: ResultModel;
            this.userController.updateStatus(req.body).then(rs => {
                result = {
                    result: rs,
                    responseMessage: 'عملیات با موفقیت انجام شد',
                    responseCode: 0
                };
                res.send(result);
            }).catch((err: Error) => {
                result = {result: err.name, responseMessage: err.message, responseCode: 400};
                res.status(400).send(result);
            });
        })
    }

    private delete = () => {
        this.router.delete('/delete', (req, res) => {
            let result: ResultModel;
            let id = req.body['id'] as string;
            this.userController.delete(id).then(rs => {
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
}