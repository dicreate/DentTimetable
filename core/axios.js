import Constants from "expo-constants";
const { manifest } = Constants;
import axios from "axios";

/* const ipPC = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
? manifest.debuggerHost
.split(`:`)
.shift()
.concat(`:6666`)
: `api.example.com`; */

const dataURL = 'tan-wandering-blackbuck.cyclic.app'

axios.defaults.baseURL = 'https://' + dataURL;

export default axios;