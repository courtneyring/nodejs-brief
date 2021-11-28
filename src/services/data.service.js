const axios = require('axios');
const cache = {};

const getData = async function(type){
    let data = cache[type];

    if (!data) {
        try {
            let url = `${process.env.LEAGUE_SOURCE_ROOT_URL}/${type}.json`
            let resp = await axios.get(url);
            data = resp.data
            cache[type] = data;
        }
        catch (e){
            console.log(e.code);
            throw e;
        }
    }
    return data;
   
}



module.exports = {
    getData
}