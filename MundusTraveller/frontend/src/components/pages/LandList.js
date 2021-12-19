import React, {Component, useState} from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Textfield from "@material-ui/core/TextField";

export default class LandList extends Component {
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
        this.user = this.props.user;
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
    
getListFromBackend = () => {
    const [coordinates, setCoordinatesFromApi] = useState([])
    React.useEffect(() => {
        axios.get("http://localhost:8000/backend/getCountryList", { params: { user: this.user }})
            .then(response => {
                this.setState({ countryList : response.data })
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
render() {
    return (
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Country List
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
    );
}
}