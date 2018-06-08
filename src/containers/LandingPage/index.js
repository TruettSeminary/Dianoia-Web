// React/Redux
import React from 'react'; 

// Design
import Button from 'md-components/CustomButtons/Button'; 
// style={{marginTop: 10 + 'rem'}}
class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    Throwing down some content here
                </div>
                <Button color="rose" onClick={()=>{
                    console.log(this.props.user); 
                }}>
                    Print User
                </Button>
            </div>
        );
    }
}

export default LandingPage; 