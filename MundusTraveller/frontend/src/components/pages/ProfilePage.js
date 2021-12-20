import React, { Component, useState } from 'react';
import Button from 'reactstrap';
//import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Textfield from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useHistory } from 'react-router-dom';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from 'axios';
import LandList from './LandList';



export default class ProfilePage extends Component {
constructor(props) {
    super(props);
    this.state = {
        reviewList: [
            {Place: 'Belgium', Review: 'I think it do be good but not too good, its okay'},
            {Place: 'Paris', Review: 'Overrated, too many tourists but bootivol'},
            {Place: 'Austria', Review: 'Yes very good'}  
        ],
    };
}

convertOneReview = (elementFromList) => {
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h6' variant='h6'>
                        Review of {elementFromList.Place}
                    </Typography>
                <Textfield
                    multiline
                    maxRows={10}
                    variant="standard"
                    defaultValue=""
                    fullWidth= 'true'
                />
                </Grid>
            </Grid>
        </div>
    )
}

showReviewList = () => {
    const convertedList = this.state.reviewList.map(el => this.convertOneReview(el))
    return <div> {convertedList} </div>  
}

checkAddCountryForm = () => {
    console.log("First tifejiazmfo")
    if (document.getElementById("countryname") === "Belgium") {
        console.log("true afaimezofj")
        return true
    } else return false
}

render() {
    return (
        <body class="primary">
            <Grid container spacing={1}>
        <Grid item xs={4} align="center">
            <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <form method="post" action="backend/addCountry/" content="raw" align="right">
                            <label>Country: <input name="countryname" id="countryname" type="text"></input> </label><br></br>
                            <label>Score: <input name="countryscore" id="countryscore" type="number" min={1} max={10}></input></label><br></br>
                            <input type="submit" value="Add Country"></input>
                        </form>
                    </Grid>
            </Grid>
        </Grid>
        <Grid item xs={4} align="center">
            <Typography component='h2' variant='h2'>
                User's Profile
            </Typography>
        </Grid>
        <Grid item xs={4} align="center">
            <button>Profile Info</button>
        </Grid>
        <Grid item xs={6} align="center">
            <LandList user="self"/>
        </Grid>
        <Grid item xs={6} align="center">
            <Typography component='h4' variant='h4'>
                User's Reviews
            </Typography>
            <this.showReviewList />
        </Grid>
    </Grid>
        </body>
    );
}
} 