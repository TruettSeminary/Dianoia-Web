// React/Redux
import React from 'react'; 

import { Router } from 'utils/router'; 


// Design
// import Button from 'md-components/CustomButtons/Button'; 

import './styles.css'; 

class LandingPage extends React.Component {
    render() {
        return (
            <div className="landingContainer">
                <h1>Welcome to Dianoia!</h1>
                <h3>
                    If you are new, please take a moment to 
                    <a onClick={(e) => {
                        e.preventDefault(); 
                        Router.pushPage('/registration'); 
                    }}> register</a>
                </h3>
            </div>
        );
    }
}

export default LandingPage; 