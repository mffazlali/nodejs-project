// crud

import fs from "fs";

let saveData = (data) => {
    try {
        let jsonData = JSON.stringify(data);
        fs.writeFileSync('./projects/demo/crudData.txt', jsonData);
        return data;
    } catch (e) {
        return null;
    }
}

let fetchData = () => {
    try {
        return JSON.parse(fs.readFileSync('./projects/demo/crudData.txt').toString());
    } catch (e) {
        return [];
    }
}


export let readAll = () => {
    let fileData = fetchData();
    if (fileData.length > 0) {
        for (let index in fileData) {
            console.log(`readAll title: ${fileData[index].title} body: ${fileData[index].body}`);
        }
    } else {
        console.log('readAll: data not fetched');
    }
}

export let read = (title) => {
    let fileData = fetchData();
    if (fileData.length > 0) {
        let fileDataFilter = fileData.filter(value => value.title === title);
        if (fileDataFilter.length > 0) {
            console.log(`read: title: ${fileDataFilter[0].title} body: ${fileDataFilter[0].body}`);
        } else {
            console.log('read: title not found');
        }
    } else {
        console.log('read: data not fetched');
    }
}

export let add = (title, body) => {
    let fileData = fetchData();
    let fileDataFilter = fileData.filter(value => value.title === title);
    if (fileDataFilter.length === 0) {
        fileData.push({title, body})
        let result = saveData(fileData);
        if (result) {
            console.log(`add: title: ${title} body: ${body}`);
        } else {
            console.log('add: data not add');
        }
    } else {
        console.log('add: title is duplicate');
    }
}

export let update = (title, body) => {
    let fileData = fetchData();
    let fileDataFilter = fileData.map((value, index) => {
        return {index, title: value.title}
    });
    fileDataFilter = fileDataFilter.filter(value => value.title === title);
    if (fileDataFilter.length > 0) {
        fileData[fileDataFilter[0].index].body = body;
        let result = saveData(fileData);
        if (result) {
            console.log(`update: title: ${title} body: ${body}`);
        } else {
            console.log('update: data not update');
        }
    } else {
        console.log('update: title not found');
    }
}

export let remove = (title) => {
    let fileData = fetchData();
    let fileDataFilter = fileData.map((value, index) => {
        return {index, title: value.title}
    });
    fileDataFilter = fileDataFilter.filter(value => value.title === title);
    if (fileDataFilter.length > 0) {
        fileData.splice(fileDataFilter[0].index, 1);
        let result = saveData(fileData);
        if (result) {
            console.log(`remove: title: ${title}`);
        } else {
            console.log('remove: data not remove');
        }
    } else {
        console.log('remove: title not found');
    }
}
