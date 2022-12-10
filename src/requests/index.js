//封装axios请求
import axios from "axios";

let service = axios.create({
    baseURL:'http://localhost:3000',
    // withCredentials:true,
    timeout:1000,
})
export default service