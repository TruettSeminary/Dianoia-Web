// React/Redux
import React from 'react'; 

// Design
import MdFooter from 'md-components/Footer/Footer'; 

import './styles.css'; 

class Footer extends React.Component {
    render() {
        return (
            <div className="footerContainer">
                <MdFooter/>
            </div>
        );
    }
}

export default Footer; 