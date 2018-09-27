import axios from 'axios';
const BASE_URl = 'http://localhost:8888';

export function post(url, body) {
    return axios.post(BASE_URl + url, body);
}

