import axios from 'axios';

let baseURL = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://aerobic-ward-301402.wl.r.appspot.com/';
}

export default () => axios.create({
  baseURL,
});
