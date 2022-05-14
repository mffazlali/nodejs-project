import {Express} from 'express';
import {UserMongooseController} from '../controller'
import {ObjectId} from "mongodb";

export class UserWebService {
    private app: Express;
    private userMongooseController: UserMongooseController;

    constructor(express: Express) {
        this.app = express;
        this.userMongooseController = new UserMongooseController();
        this.fetchAll();
        this.fetch();
        this.insert();
        this.update();
        this.delete();
    }

    private fetchAll = () => {
        this.app.get('/fetchalluser', (req, res) => {
            this.userMongooseController.readAll().then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

    private fetch = () => {
        this.app.get('/fetchuser', (req, res) => {
            if (!ObjectId.isValid(req.query['_id'] as string)) {
                res.status(400).send();
            }
            this.userMongooseController.read(req.query).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

    private insert = () => {
        this.app.post('/insertuser', (req, res) => {
            this.userMongooseController.create(req.body).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

    private update = () => {
        this.app.patch('/updateuser', (req, res) => {
            if (!ObjectId.isValid(req.body._id)) {
                res.status(400).send();
            }
            this.userMongooseController.update(req.body).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

    private delete = () => {
        this.app.delete('/deleteuser/:id', (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                res.status(400).send();
            }
            this.userMongooseController.delete(req.body).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

}