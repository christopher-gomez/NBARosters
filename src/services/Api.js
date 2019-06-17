import axios from 'axios';

let baseURL = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://nbarosters.herokuapp.com';
}

export default () => axios.create({
  baseURL,
});
