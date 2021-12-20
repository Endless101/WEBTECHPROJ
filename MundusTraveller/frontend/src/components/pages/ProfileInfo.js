import React, { Component, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Textfield from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logout from "./Logout"

export default class ProfilePage extends Component {
constructor(props) {
    super(props);
    this.state = {
        userinfo : [],
    };
}

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


render() {
    return (
        <body class="primary">
    <Grid container spacing={1}>
        <Grid item xs={8} align="center">
            <Typography component="h2" variant="h2">
                User Info
                </Typography>
        </Grid>
        <Grid item xs={4} align="center">
          <Button
            variant="contained"
            color="primary"
            to={"/"}
            component={Link}
          >
            Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            to={"/profile"}
            component={Link}
          >
            Profile
          </Button>
          <Button
            variant="contained"
            color="primary"
            to={"/register"}
            component={Link}
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="primary"
            to={"/login"}
            component={Link}
          >
            Log in
          </Button>
          <Logout/>
        </Grid>
        <Grid item xs={8} align="center">
            <this.getUserInfo />
        </Grid>
    </Grid>
    </body>
    );
}
}