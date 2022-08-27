import axios from 'axios';
const key = "ee726807a49066d3b79a480bc3cd828d";
const END_POINT = "http://api.positionstack.com/v1/";


// export class GeoApi {
//     config = {
//         url: 'reverse?',
//         baseURL: END_POINT,
//         params: {
//             access_key: key, //key for request
//             query: "46.3077376,30.6151424", //Page size of the response => String
//         },
//     }
//     constructor() { };
//     static async fetchGeoApi() {
//         const responce = await axios.request(this.config);
//         const data = responce.data;
//         return data
//     };

// }

function name(params) {
    return fetch('http://api.positionstack.com/v1/reverse?access_key=ee726807a49066d3b79a480bc3cd828d&query=46.3077376,30.6151424')
        .then(data => data.json())
        .then(data => data)
}
name();



// GeoApi.fetchGeoApi().then(data => console.log(data))
/*

// Reverse Geocoding API Endpoint

http://api.positionstack.com/v1/forward
    ? access_key = YOUR_ACCESS_KEY
    & query = 40.7638435,-73.9729691
    
// optional parameters: 

    & limit = 10
    & output = json
    // more optional parameters available 
*/