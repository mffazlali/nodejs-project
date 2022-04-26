import {googleApiCallbackService, googleApiPromiseService, googleApiAxiosService} from './src/services/index'
import Yargs from "yargs";

let yargsArg = Yargs(process.argv.slice(2))
    .options({
        a: {
            alias: 'address',
            describe: 'address position',
            demand: true,
            string: true
        }
    })
    .help()
    .argv;

googleApiCallbackService.getAll();
googleApiCallbackService.getByQuery(yargsArg.address, (error, result) => {
    if (error) {
        console.log('callback error: ', error);
    } else {
        console.log('callback result: ', JSON.stringify(result, undefined, 2));
    }
});

googleApiPromiseService.getByQuery(yargsArg.address).then((result) => {
    console.log('promise result: ', JSON.stringify(result, undefined, 2));
}).catch(error => {
    console.log('promise error: ', error);
});

googleApiAxiosService.getByQuery(yargsArg.address).then((result) => {
    console.log('axios result: ', result.data);
}).catch(error => {
    console.log('axios error: ', error);
});