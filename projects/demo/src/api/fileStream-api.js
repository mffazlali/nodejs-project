import fs from 'fs';
import Notes from '../model/notes'
console.log('start fileStream')
export function fileStream()
{
    let notes = new Notes();
    console.log('start file stream api');
    fs.appendFile('./projects/demo/fileStream.txt', `hello age is ${notes.age} \n`, 'utf8', err => {
        if (err) throw err
    });
}
