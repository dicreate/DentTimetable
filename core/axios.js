import Constants from "expo-constants";
const { manifest } = Constants;
import axios from "axios";

/* const ipPC = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
? manifest.debuggerHost
.split(`:`)
.shift()
.concat(`:6666`)
: `api.example.com`; */

const ipPC = '10.0.2.2:6666'

axios.defaults.baseURL = 'http://'+ipPC;

console.log(axios.defaults.baseURL)

export default axios;