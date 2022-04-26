import request from 'request'

let getAll = () => {
    return request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1201',
        json: true
    }, (error, response, body) => {
        console.log(response)
    })
}

// callback abstraction
let getByQuery = (address,callback) => {
    let addressDecode=decodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressDecode}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback(error);
        }else {
            callback(undefined,body);
        }
    })
}

export let googleApiCallbackService={
    getAll,
    getByQuery
}