import axios from 'axios';
import { keyMaks, keyDenys } from './const';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const source = 'events';
const API_KEY = keyMaks;
// const API_KEY = keyDenys;

export class EventApi {
  static config = {
    // `url` is the server URL that will be used for the request
    url: 'events',
    // `method` is the request method to be used when making the request
    method: 'get', // default
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: BASE_URL,
    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    // NOTE: params that are null or undefined are not rendered in the URL.
    params: {
      apikey: API_KEY, //key for request
      size: '16', //Page size of the response => String
      page: '0', //number of current page -> string
      countryCode: '', //Filter by country code
      keyword: ' ', //Keyword to search on
      includeTBD: ' ', //yes, to include with a date to be defined (TBD)
      includeTBA: ' ', //
      preferredCountry: '', //Popularity boost by country, default is us ["us", "ca"]
      geoPoint: '',
    },
    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    // timeout: 3000, // default is `0` (no timeout)

    // `responseType` indicates the type of data that the server will respond with
    // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
    //   browser only: 'blob'
    responseType: 'json', // default
  };
  constructor() {}
  static async fetchApiData() {
    const responce = await axios.request(this.config);
    const data = responce.data;
    // localStorage.setItem('event', JSON.stringify(data));
    return data;
  }
  static setCountry(country) {
    this.config.params.countryCode = country;
  }
  static setEndPoint(endPoint) {
    this.config.url = endPoint;
  }
  static setKeyword(keyword) {
    this.config.params.keyword = keyword;
  }
  static setPage(page) {
    this.config.params.page = page;
  }
  static getPage(page) {
    return this.config.params.page;
  }
  static setGeoPoint(hash) {
    this.config.params.geoPoint = hash;
  }
  static setPreferredCountry(countryCode) {
    this.config.params.preferredCountry =
      this.config.params.preferredCountry.push(`${countryCode}`);
  }
  static async getMoreDataById(id) {
    const url = `${BASE_URL}${source}/${id}.json?apikey=${API_KEY}`;
    const responce = await fetch(url);
    const data = await responce.json();
    return data;
  }
  static async getById(id) {
    const url = `${BASE_URL}${source}/${id}.json?apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  }
}
