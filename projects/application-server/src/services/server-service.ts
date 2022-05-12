import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import {ActionWebService, UserWebService} from "../webServices";

let serverService = () => {
    dotenv.config();
    const port = process.env.PORT;
    let app = express();
    app.use(bodyParser.json());

    new ActionWebService(app);
    new UserWebService(app);

    app.listen(port, () => {
        console.log(`server run on port ${port}`)
    });
}

export {serverService}