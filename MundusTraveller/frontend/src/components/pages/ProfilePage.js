import React, { Component, useState } from 'react';
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
import axios from 'axios';



export default class ProfilePage extends Component {
constructor(props) {
    super(props);
    this.state = {
        countryList: [],
        reviewList: [
            {Place: 'Belgium', Review: 'I think it do be good but not too good, its okay'},
            {Place: 'Paris', Review: 'Overrated, too many tourists but bootivol'},
            {Place: 'Austria', Review: 'Yes very good'}  
        ],
    };
}



convertOneLand = (country, score) => {
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={6} align="center">
                    {country}
                </Grid>
                <Grid item xs={6} align="center">
                    {score}/10
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

getListFromBackend = () => {
    const [coordinates, setCoordinatesFromApi] = useState([])
    React.useEffect(() => {
        axios.get("backend/getCountryList")
            .then(response => {
                this.setState({ countryList : response.data})
            }, error => {
                console.log(error)
            })
    }, [coordinates.length])
}

showLandList = () => {
    this.getListFromBackend()
    const ctryList = this.state.countryList
    const convertedList = []
    for (let i = 0; i < ctryList.length; i = i+2) {
        convertedList.push(this.convertOneLand(ctryList[i], ctryList[i+1]))
    } 
    return <div> {convertedList} </div>
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
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component='h2' variant='h2'>
                User's Profile
            </Typography>
        </Grid>
        <Grid item xs={6} align="center">
            <form method="post" action="backend/addCountry/" content="raw">
                <label>Country: <input name="countryname" id="countryname" type="text"></input> </label><br></br>
                <label>Score: <input name="countryscore" id="countryscore" type="number" min={1} max={10}></input></label><br></br>
                <input type="submit" value="Add Country"></input>
            </form>
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