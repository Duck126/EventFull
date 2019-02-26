import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';

const styles = theme => ({
  root: {
     width: '25%',
     backgroundColor: '#4444',
     position: 'fixed',
     bottom: '0%',
     right: '0%',
     overflowY: 'scroll',
     overflowX: 'hidden',
     height: '45%'
  },
  divider: {
      color: 'black',
      height: '3px',
      width: '100%',
      position: 'absolute',
      bottom: '0%'
  },
  avatar: {
    width: '50px',
    height: '50px',
    position: 'absolute',
    bottom: '30%',
    right: '0%'
  }
});

class FolderList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            eventData: []
        }
    }
    render(){
        const { classes } = this.props;
        return (
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <List className={classes.root}>
                {this.props.eventData.map((el, i) =>{
                    return <ListItem><Divider className={classes.divider}/> <Avatar className={classes.avatar} src={el.image}/> <ListItemText key={i} primary={el.name} secondary={el.venue + " " +el.address} /></ListItem> 
                })}
            </List>
        </Grid>
        );
    }
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FolderList);