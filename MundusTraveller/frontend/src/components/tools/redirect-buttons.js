import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Logout from "../pages/Logout"

export default class RedirectButtons extends Component {
    constructor(props){
        super(props);
        this.page = this.props.page
    }
    
    getListOfRedirects = (currentPage) => {
        switch(currentPage) {
            case "home":
                return ["profile", "register", "login", "logout"]
            case "profile":
                return ["home", "profile info", "register", "login", "logout"]
            case "register":
                return ["home", "profile", "login"]
            case "login":
                return ["home", "profile", "register"]
            case "profile info":
                return ["home", "profile", "register", "login", "logout"]  
            case "otherprofile":
                return ["home", "profile", "register", "login", "logout"] 
            case "country":
                return ["home", "profile", "register", "login", ]   
        }
    }
    getButtonLink = (page) => {
        switch(page) {
            case "home":
                return "/"
            case "profile":
                return "/profile"
            case "register":
                return "/register"
            case "login":
                return "/login"
            case "profile info":
                return "/profile/info"     
        }
    }
    makeOneButton = (page) => {
        if (page == "logout"){
            return <Logout />
        } else {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    to={this.getButtonLink(page)}
                    component={Link}
                >
                    {page}    
                </Button>
            );
        }
    }
    makeButtons = () => {
        const listOfRedirects = this.getListOfRedirects(this.page)
        const convertedList = listOfRedirects.map(x => this.makeOneButton(x))
        return <div>{convertedList}</div>
    }
    
    render() {
        return(
            <this.makeButtons />            
        );
    }
}