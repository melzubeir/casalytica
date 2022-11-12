import axios, { AxiosResponse } from 'axios';

const DEFAULT_ENDPOINT = 'https://casalytica.com/api';

let client = AxiosInstance;


export class CasalyticaClient {

  baseUrl = '';

  constructor(baseUrl = DEFAULT_ENDPOINT) {
    this.baseUrl = baseUrl;
    client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async postImpression(data) {
    try {
      const response = await client.put(self.baseUrl + '/impression/put', data);
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
