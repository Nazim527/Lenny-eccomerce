import axios from 'axios';

export const instance = axios.create({
    baseURL: "http://localhost:1337/api",
    headers: {
        Authorization: "bearer " + import.meta.env.VITE_API_TOKEN,
        "Content-Type": "application/json"
    }
})