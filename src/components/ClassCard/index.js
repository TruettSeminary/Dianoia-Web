import React from 'react';
import PropTypes from 'prop-types'; 

import Button from 'md-components/CustomButtons/Button'; 
import Card from "md-components/Card/Card.jsx";
import CardBody from "md-components/Card/CardBody.jsx";
import CardFooter from "md-components/Card/CardFooter.jsx"; 

// Styles
import styles from './styles'; 

class ClassCard extends React.Component {
    constructor(props) {
        super(props); 
    }
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <h4 style={styles.name}>{this.props.clazz.name}</h4>
                        <p>{this.props.clazz.description}</p>
                        <CardFooter style={styles.footer}>
                            <Button
                                color={this.props.userInClass ? 'warning' : 'info'}
                                onClick={() => this.props.classAction(this.props.clazz._id)}
                            >
                                {this.props.userInClass ? 'Leave' : 'Join'}
                            </Button>
                        </CardFooter>
                    </CardBody>
                </Card>
                
            </div>
        );
    }
}

ClassCard.propTypes = {
    clazz: PropTypes.object.isRequired,
    userInClass: PropTypes.bool.isRequired, 
    classAction: PropTypes.func.isRequired
}

export default ClassCard