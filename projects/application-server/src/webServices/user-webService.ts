import {Express} from 'express';
import {UserMongooseController} from '../controller'

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
            req.query
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
        this.app.post('/updateuser', (req, res) => {
            this.userMongooseController.update(req.body).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

    private delete = () => {
        this.app.post('/deleteuser', (req, res) => {
            this.userMongooseController.delete(req.body).then(r => {
                res.send(r);
            }).catch(e => {
                res.status(400).send(e);
            })
        })
    }

}