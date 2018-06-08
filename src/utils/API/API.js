// TODO: add support for loading from config/.env file
const BASENAME = 'http://localhost:1337'; 

const http_methods = {
    GET: 'GET',
    POST: 'POST', 
    PUT: 'PUT', 
    DELETE: 'DELETE'
};

const user = {
    login: {
        method: http_methods.POST, 
        route: '/auth/local'
    }
}

const API = {
    BASENAME, 
    http_methods, 

    getUser: (identifier, password) => {
        return fetch(`${BASENAME}${user.login.route}`, {
            headers: {
                'content-type': 'application/json'
            }, 
            method: user.login.method, 
            body: JSON.stringify({
                identifier, 
                password
            })
        }).then(res => res.json())
        .catch(err => console.error('Error:', err)) 
    }

}



export default API; 