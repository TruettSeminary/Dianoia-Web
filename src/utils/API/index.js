import { Dianoia } from 'dianoia-js'; 
import config from 'config.js'
// TODO: figure out how to update baseurl here

// TODO: figure out how to update credentials here
const jwt = ''; 
const api = new Dianoia({baseURL: config.baseURL, jwt}); 
export default api; 