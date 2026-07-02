import axios from "axios";

//const BASE_URL = import.meta.env.MODE == "development" ? "http://localhost:5090/api" : "/api"
const api = axios.create({
    baseURL : "/api",
});

export default api;
