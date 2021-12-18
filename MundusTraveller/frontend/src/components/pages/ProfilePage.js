import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Textfield from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from 'react-router-dom';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";



export default class ProfilePage extends Component {
constructor(props) {
    super(props);
    this.state = {
        landList: [
            {Name:'Belgium', Score:10},
            {Name:'France', Score:5},
            {Name:'Netherlands', Score:7},
            {Name:'Germany', Score:6}
        ],
        reviewList: [
            {Place: 'Belgium', Review: 'I think it do be good but not too good, its okay'},
            {Place: 'Paris', Review: 'Overrated, too many tourists but bootivol'},
            {Place: 'Austria', Review: 'Yes very good'}  
        ],
    };
}



convertOneLand = (elementFromList) => {
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={6} align="center">
                    {elementFromList.Name}
                </Grid>
                <Grid item xs={6} align="center">
                    {elementFromList.Score}/10
                </Grid>
            </Grid>
        </div>
    )
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

showLandList = () => {
    const convertedList = this.state.landList.map(el => this.convertOneLand(el))
    return <div> {convertedList} </div>
}

showReviewList = () => {
    const convertedList = this.state.reviewList.map(el => this.convertOneReview(el))
    return <div> {convertedList} </div>  
}

render() {
    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component='h2' variant='h2'>
                User's Profile
            </Typography>
        </Grid>
        <Grid item xs={6} align="center">
            <Typography component='h4' variant='h4'>
                User's Country List
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={6} align="center">
                    <Typography component='h5' variant='h5'>
                     Name
                    </Typography>
                </Grid>
                <Grid item xs={6} align="center">
                    <Typography component='h5' variant='h5'>
                        Score
                    </Typography>
                </Grid>
            </Grid>
            <this.showLandList />
        </Grid>
        <Grid item xs={6} align="center">
            <Typography component='h4' variant='h4'>
                User's Reviews
            </Typography>
            <this.showReviewList />
        </Grid>
    </Grid>);
}
} 