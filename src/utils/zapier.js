import fetch from 'node-fetch'; 

const postData = (url = ``, data = {}) => {
    return fetch(url, {
        method: "POST", 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        body: JSON.stringify(data)
    }).then(response => response.json())
    .catch(error => console.error(`Zapier Fetch error=\n`, error)); 
}

function sendFeedback({first_name, last_name, email, subject, message}) {

    const BASEURL = 'https://hooks.zapier.com/hooks/catch/3645020/glki7f/'; 
    
    if(!first_name || !last_name || !email || !message) return false; 

    else return postData(BASEURL, {
        first_name, 
        last_name, 
        email,
        subject,
        message
    }); 
}

export default {
    sendFeedback
}