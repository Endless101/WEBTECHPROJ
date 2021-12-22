/* React imports */
import React, { Component, useState } from 'react';
import { Grid, Typography } from "@material-ui/core";
import axios from 'axios';
/* Tool imports */
import RedirectButtons from '../tools/redirect-buttons';

export default class ProfileInfo extends Component {
constructor(props) {
    super(props);
    this.state = {
        userinfo : [],
    };
}
/*
    Fetches a list with the personal information of the current user from the database
    and stores it in 'userinfo'
*/
getListFromBackend = () => {
    const [coordinates, setCoordinatesFromApi] = useState([])
    React.useEffect(() => {
        axios.get("http://localhost:8000/backend/getUserInfo")
            .then(response => {
                this.setState({ userinfo : response.data })
            }, error => {
                console.log(error)
            })
    }, [coordinates.length])
}
/*
    After getting the list with the personal information of the user,
    returns the adapted HTML to display the information on screen
*/
getUserInfo = () => {
    this.getListFromBackend()
    const userinfo = this.state.userinfo
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={6} align="right">
                    Firstname: 
                </Grid>
                <Grid item xs={6} align="left">
                    {userinfo[0]} 
                </Grid>
                <Grid item xs={6} align="right">
                    Lastname: 
                </Grid>
                <Grid item xs={6} align="left">
                    {userinfo[1]} 
                </Grid>
                <Grid item xs={6} align="right">
                    Username: 
                </Grid>
                <Grid item xs={6} align="left">
                    {userinfo[2]}
                </Grid>
                <Grid item xs={6} align="right">
                    Email: 
                </Grid>
                <Grid item xs={6} align="left">
                    {userinfo[3]}
                </Grid>
                <Grid item xs={6} align="right">
                    Date of birth:
                </Grid>
                <Grid item xs={6} align="left">
                    {userinfo[4]}
                </Grid>
            </Grid>
        </div>
    )
}
/*
    Renders the UserInfo page that displays the user's personal information
*/
render() {
    return (
        <body class="primary">
    <Grid container spacing={1}>
        <Grid item xs={4} align="center">
        </Grid>
        <Grid item xs={4} align="center">
            <Typography component="h2" variant="h2">
                User Info
            </Typography>
        </Grid>
        <Grid item xs={4} align="center">
          <RedirectButtons page="profile info" />
        </Grid>
        <Grid item xs={12} align="center">
            <this.getUserInfo />
        </Grid>
    </Grid>
    </body>
    );
}
}