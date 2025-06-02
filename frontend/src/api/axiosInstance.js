import axios from "axios"

const axiosInstance = axios.create({


    baseURL: `http://localhost:8000/api`,
    headers: {

        "Content-Type": "multipart/form-data",

    },

    withCredentials: true

})
export default axiosInstance