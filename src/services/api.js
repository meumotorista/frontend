import axios from 'axios';

const api = axios.create({
    baseURL: 'https://meumotorista-api-json-jvnb.vercel.app', // API URL from User Request
});

export default api;
