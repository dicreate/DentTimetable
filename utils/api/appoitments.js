import axios from "../../core/axios";


export default {
   get: () => axios.get('/appoitments'),
   remove: id => axios.delete('/appoitments/' + id),
   add: values => axios.post('/appoitments/', values),
}