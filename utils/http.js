import axios from "axios";

const instance = axios.create({
    baseURL:"https://password-reset-backend-2o98.onrender.com/api"
    // timeout:1000
})

export default instance;