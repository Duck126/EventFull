import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import image from '../../assets/images/logo.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo: {
    height: '100%',
    width: '12.5%',
    position: 'absolute',
    top: '0%',
    left: '43.25%' 
  },
  bgimage: {
    width: '100%',
    height: '25%'
  },
  AppBar: {
    height: '7.5%',
    backgroundColor: 'black'
  }
};

class Header extends React.Component {
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.AppBar}>
          <Toolbar>
            <div>
              <img className={classes.logo} src={image} alt="EventFull Logo"></img>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);