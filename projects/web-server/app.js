import express from 'express'
import {DemoWebService} from './src/webServices/index'

let app = express();
let demoService = new DemoWebService(app);
app.use((req, res, next) => {
    console.log(`${new Date()} : ${req.method} ,${req.url}`)
    next();
})
app.use((req, res) => {
    res.render('offline');
})
demoService.getHomePage()
demoService.getJson()
demoService.getNotFoundPage()
demoService.getHelpPage()
demoService.getAboutPage()

app.listen(3000, () => {
    console.log('server run on port 3000')
});

export let app2 = {
    app
}



