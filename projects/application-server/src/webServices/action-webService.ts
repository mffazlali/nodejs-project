import {Express} from 'express';
import {ActionMongooseController} from '../controller'

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
            req.query
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
        this.app.post('/updateaction', (req, res) => {
            this.actionMongooseController.update(req.body).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

    private delete = () => {
        this.app.post('/deleteaction', (req, res) => {
            this.actionMongooseController.delete(req.body).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

}