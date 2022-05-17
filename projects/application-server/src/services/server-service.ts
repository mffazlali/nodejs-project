import dotenv from "dotenv";
import bodyParser from "body-parser";
import {ActionWebService, UserWebService} from "../webServices";
import {Express, RequestHandler} from "express";

let serverService = (app: Express) => {
    dotenv.config();
    const port = process.env.PORT;
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        next()
    })

    let actionWebService = new ActionWebService();
    let userWebService = new UserWebService();
    app.use('/action', actionWebService.router);
    app.use('/user', userWebService.router);

    app.listen(port, () => {
        console.log(`server run on port ${port}`)
    });
}

export {serverService}