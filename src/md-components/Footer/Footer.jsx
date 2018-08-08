import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { 
  List, 
  withStyles } from "material-ui";


import footerStyle from "assets/jss/material-kit-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;

  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });

  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>

        </div>
        <div className={classes.right}>
          <div>
            &copy; {1900 + new Date().getYear()},{" "}
            <a href="https://church.technology" className={aClasses}>
              Church.Technology
            </a>            
          </div>
          <div>
            <a href="https://baylor.edu/Truett" className={aClasses}>
                <img src="/images/truett-dude.png" alt="" />
                Truett Seminary
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
