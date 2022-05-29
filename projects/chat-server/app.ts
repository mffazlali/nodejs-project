import express from "express";
import {SocketService} from "./src/services";

let appExpress = express();

let app = () => {
    SocketService(appExpress);
}

app();

export default {app: app}
