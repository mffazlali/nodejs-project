import express from 'express'
import {DemoService} from './src/services/index'

let app = express();
let demoService = new DemoService(app);
app.use((req, res, next) => {
    console.log(`${new Date()} : ${req.method} ,${req.url}`)
    next();
})
// app.use((req, res, next) => {
//     res.render('offline');
// })
demoService.getHomePage()
demoService.getJson()
demoService.getNotFoundPage()
demoService.getHelpPage()
demoService.getAboutPage()

app.listen(3000,()=>{
    console.log('server is running in port 3000')
});



