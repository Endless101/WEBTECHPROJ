import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Textfield from "@material-ui/core/TextField";
import axios from 'axios';
import LandList from "./LandList";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.match.params.user;
    }

render() {
    return (
    <Grid container spacine={1}>
        <Grid item xs={12} align="center">
            <Typography component='h2' variant='h2'>
                {this.user} 's profile
            </Typography>
        </Grid>
        <Grid container spacine={1}>
            <Grid item xs={6} align="center">
                <LandList user={this.user}/>
            </Grid>
            <Grid item xs={6} align="center">
            </Grid>
        </Grid>

        
       
    </Grid>
    ); 
}
}