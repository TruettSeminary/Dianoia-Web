import { Dianoia } from 'dianoia-js'; 
import auth from 'utils/auth'; 
// TODO: figure out how to update baseurl here

// TODO: figure out how to update credentials here
const baseURL = 'http://localhost:1337'
const jwt = auth.getToken(); 
const api = new Dianoia({baseURL, jwt}); 
export default api; 