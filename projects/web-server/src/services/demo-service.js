import express from 'express'
import hbs from 'hbs'

export class DemoService {
    app = null;

    constructor(express) {
        this.app = express;
        this.app.set('views', 'projects/web-server/src/views');
        this.app.set('view engine', 'hbs');
        hbs.registerPartials('projects/web-server/src/views/partials');
        hbs.registerHelper('getCurrentData',()=> new Date())
    }

    getHomePage = () => {
        this.app.get('/', (req, res) => {
            res.send('<h1>ok</h1>')
        })
    }

    getJson = () => {
        this.app.get('/json', (req, res) => {
            res.send({name: 'ali', webSite: ['google', 'yahoo']})
        })
    }

    getNotFoundPage = () => {
        this.app.get('/not found', (req, res) => {
            res.send('not found')
        })
    }

    getHelpPage = () => {
        this.app.use(express.static('projects/web-server/src/views'))
    }

    getAboutPage = () => {
        this.app.get('/about', (req, res) => {
            res.render('about', {
                title: 'درباره ما',
                description: 'صفحه درباره ما',
                date: new Date()
            })
        })
    }

}

