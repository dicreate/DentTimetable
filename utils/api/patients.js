import axios from "../../core/axios";


export default {
   get: () => axios.get('/patients')
}