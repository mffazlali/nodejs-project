import request from 'request'

let getByQuery = (address) => {
    let addressDecode = decodeURIComponent(address);
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressDecode}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        })
    })

}

export let googleApiPromiseService = {
    getByQuery
}