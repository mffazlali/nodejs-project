import {Express} from 'express';
import {ActionMongooseController} from '../controller'
import {ObjectId} from "mongodb";

export class ActionWebService {
    private app: Express;
    private actionMongooseController: ActionMongooseController;

    constructor(express: Express) {
        this.app = express;
        this.actionMongooseController = new ActionMongooseController();
        this.fetchAll();
        this.fetch();
        this.insert();
        this.update();
        this.delete();
    }

    private fetchAll = () => {
        this.app.get('/fetchallaction', (req, res) => {
            this.actionMongooseController.readAll().then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

    private fetch = () => {
        this.app.get('/fetchaction', (req, res) => {
            if (!ObjectId.isValid(req.query['_id'] as string)) {
                res.status(400).send();
            }
            this.actionMongooseController.read(req.query).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

    private insert = () => {
        this.app.post('/insertaction', (req, res) => {
            this.actionMongooseController.create(req.body).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

    private update = () => {
        this.app.patch('/updateaction', (req, res) => {
            if (!ObjectId.isValid(req.body._id)) {
                res.status(400).send();
            }
            this.actionMongooseController.update(req.body).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

    private delete = () => {
        this.app.delete('/deleteaction/:id', (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                res.status(400).send();
            }
            this.actionMongooseController.delete(new ObjectId(id)).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

}