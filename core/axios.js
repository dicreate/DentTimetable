import Constants from "expo-constants";
const { manifest } = Constants;
import axios from "axios";

/* const ipPC = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
? manifest.debuggerHost
.split(`:`)
.shift()
.concat(`:6666`)
: `api.example.com`; */

const dataURL = "https://tan-wandering-blackbuck.cyclic.app";

/* const dataURL = 'http://10.0.2.2:6666' */

axios.defaults.baseURL = dataURL;

export default axios;
