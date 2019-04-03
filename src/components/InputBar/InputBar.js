import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../../styles/InputStyles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EventList from '../EventList/EventList';
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import unImage from '../../assets/images/unav.png';
import Typography from '@material-ui/core/Typography';

class InputBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: "music",
            location: "Austin TX",
            radius: "30mi",
            date:"this_week",
            eventList: [],
            eventLocations: []
        };
    this.handleSubmit = this.handleSubmit.bind(this);
}

    handleSubmit = event => {
        event.preventDefault();
        const searchData = {
            searchInput: this.state.searchInput,
            location: this.state.location,
            radius: this.state.radius,
            date: this.state.date
        };
        let token = 'OLPILUHKOMUJANS4DN2I';
        let myurl = "https://www.eventbriteapi.com/v3/events/search/?q=" + searchData.searchInput +
        "&location.address=" + searchData.location +
        "&location.within=" + searchData.radius +
        "&start_date.keyword=" + searchData.date +
        "&token=" + token + "&expand=venue";
        axios({
            method: 'get',
            url: myurl,
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(res=>{
            let events = res.data.events;
            console.log(events);
            let tempArr = [];
            let locArr = []; 
            let imgArr = [];
            for(var i = 0; i < events.length; i++){
                if(events[i].logo == null){
                    imgArr.push(unImage);
                }else {
                    imgArr.push(events[i].logo.url)
                }
                console.log(imgArr);
                let event = {
                    name: events[i].name.text,
                    venue: events[i].venue.name,
                    address: events[i].venue.address.localized_address_display,
                    time: events[i].start.local,
                    img: imgArr[i],
                    eventId: i + 1
                };
                let eventLoc = {
                    lat: parseFloat(events[i].venue.latitude),
                    lng: parseFloat(events[i].venue.longitude),
                    eventId: i + 1,
                    name: events[i].name.text
                };
                locArr.push(eventLoc);
                tempArr.push(event);
            };
            this.setState({
                eventList: tempArr,
                eventLocations: locArr
             });
            this.handleLocations(event);
            console.log(this.state.eventList);
            console.log(this.state.eventLocations);
        })
        .catch(err=>{
            console.log(err);
        });  
    };

    handleLocations() {
        this.props.locationHandle(this.state.eventLocations);
    }

    handleChange = name => event => {
        event.preventDefault();
        this.setState({
          [name]: event.target.value,
        });
        console.log(this.state.searchInput);
    };

    handleInput = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
    const { classes } = this.props;
        return (
            <Grid container>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <ExpansionPanel className={classes.Container}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Search Input</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <form className={classes.Container2}noValidate>
                                <TextField
                                    id="event"
                                    label="Event"
                                    className={classes.textField}
                                    value={this.state.searchInput}
                                    onChange={this.handleChange('searchInput')}
                                />
                                <TextField
                                    id="location"
                                    label="Location"
                                    className={classes.textField}
                                    value={this.state.location}
                                    onChange={this.handleChange('location')}
                                />
                                <FormControl className={classes.formControl} style={Styles.Date}>
                                    <InputLabel shrink htmlFor="age-label-placeholder" style={Styles.labels}>
                                        Date
                                    </InputLabel>
                                    <Select
                                        value={this.state.date}
                                        onChange={this.handleInput}
                                        input={<Input name="date" id="date" />}
                                        displayEmpty
                                        name="date"
                                        className={classes.selectEmpty}
                                        style={Styles.Date}
                                    >
                                        <MenuItem value={"today"}>Today</MenuItem>
                                        <MenuItem value={"tomorrow"}>Tomorrow</MenuItem>
                                        <MenuItem value={"this_week"}>This Week</MenuItem>
                                        <MenuItem value={"this_month"}>This Month</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl} style={Styles.Radius}>
                                    <InputLabel shrink htmlFor="age-label-placeholder" style={Styles.labels}>
                                        Radius
                                    </InputLabel>
                                    <Select
                                        value={this.state.radius}
                                        onChange={this.handleInput}
                                        input={<Input name="radius" id="radius" />}
                                        displayEmpty
                                        name="radius"
                                        className={classes.selectEmpty}
                                        style={Styles.Radius}
                                    >
                                        <MenuItem value={"5mi"}>5mi</MenuItem>
                                        <MenuItem value={"10mi"}>10mi</MenuItem>
                                        <MenuItem value={"20mi"}>20mi</MenuItem>
                                        <MenuItem value={"30mi"}>30mi</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="contained" color="black" className={classes.button} onClick={this.handleSubmit}>
                                    Search
                                </Button>
                            </form>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <EventList eventData = {this.state.eventList}/>
                </Grid>
            </Grid>

        );
    }
}

InputBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(InputBar);