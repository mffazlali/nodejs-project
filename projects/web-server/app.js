import express from 'express'
import {DemoWebService} from './src/webServices/index'
import dotenv from 'dotenv';

dotenv.config();
let app = express();
const port = process.env.PORT;
let demoService = new DemoWebService(app);
app.use((req, res, next) => {
    console.log(`${new Date()} : ${req.method} ,${req.url}`)
    next();
})
// app.use((req, res) => {
//     res.render('offline');
// })
demoService.getHomePage()
demoService.getJson()
demoService.getNotFoundPage()
demoService.getHelpPage()
demoService.getAboutPage()

app.listen(port, () => {
    console.log(`server run on port ${port}`)
});

export let app2 = {
    app
}



