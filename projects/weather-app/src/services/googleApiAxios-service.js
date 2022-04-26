import axios from "axios";

let getByQuery = (address) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
            address
        }
    })
}

export let googleApiAxiosService = {
    getByQuery
}