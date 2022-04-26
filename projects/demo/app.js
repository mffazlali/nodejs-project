import {fileStream, operatingSystem} from "./src/api/index";
import _ from 'lodash'
import {readAll, read, add, update, remove} from './src/utility/index'
import Yargs from "yargs";

// api node
fileStream();
operatingSystem();

// lodash package
console.log(_.isString(true));
console.log(_.isString('ehsan'));
let list1 = [1, 1, 1, 2, 4, 6, 7, 5, 4];
console.log(_.uniq(list1));

// command args
let titleOptions = {
    describe: 'title of data',
    alias: 't',
    demand: true
};
let bodyOptions = {
    describe: 'body of data',
    alias: 'b',
    demand: true
};

let processArg = process.argv;
let yargsArg = Yargs(process.argv.slice(2))
    .command('readAll', 'read all data', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('read', 'read data', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('add', 'add data', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('update', 'update data', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'remove data', {
        title: titleOptions,
        body: bodyOptions
    })
    .help()
    .argv;
console.log('processArg', processArg);
console.log('yargsArg', yargsArg);
switch (yargsArg._[0]) {
    case 'readAll':
        readAll();
        break;
    case 'read':
        read(yargsArg.title);
        break;
    case 'add':
        add(yargsArg.title, yargsArg.body)
        break;
    case 'update':
        update(yargsArg.title, yargsArg.body);
        break;
    case 'remove':
        remove(yargsArg.title);
        break;
}
