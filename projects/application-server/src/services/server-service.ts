import dotenv from "dotenv";
import bodyParser from "body-parser";
import {ActionWebService, UserWebService} from "../webServices";
import {Express} from "express";

let serverService = (app:Express) => {
    dotenv.config();
    const port = process.env.PORT;
    app.use(bodyParser.json());

    new ActionWebService(app);
    new UserWebService(app);

    app.listen(port, () => {
        console.log(`server run on port ${port}`)
    });
}

export {serverService}