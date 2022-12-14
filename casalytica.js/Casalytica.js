import axios, { AxiosResponse } from 'axios';
import ipify from 'ipify';
const useragent = require('get-user-agent');

const DEFAULT_ENDPOINT = 'https://api.casalytica.com/v0';

let client = AxiosInstance;


export class CasalyticaClient {

  baseUrl = '';
  CASALYTICA_API_KEY = ''

  constructor(baseUrl = DEFAULT_ENDPOINT, CASALYTICA_API_KEY = '') {
    this.baseUrl = baseUrl;
    client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + CASALYTICA_API_KEY,
      },
    });
  }

  async postImpression(data) {

    if (data.remote_addr === undefined) {
      data.remote_addr = await ipify();
    }

    try {
      const response = await client.post(self.baseUrl + '/impression/put', data);
    } catch (e) {
      if (e.response) {
        return e.response;
      } else {
        throw e;
      }
    }
    return response?.data;
  }


  async getImpressions(post) {

    try {
      const response = await client.post(self.baseUrl + '/posts/' + post, {});
    } catch (e) {
      if (e.response) {
        return e.response;
      } else {
        throw e;
      }
    }
    return response?.data;
  }

}
