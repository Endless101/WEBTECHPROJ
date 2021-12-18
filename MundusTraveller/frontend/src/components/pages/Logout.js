import axios from "axios";
import React, {Component} from "react";


export default class Logout extends Component {
    constructor(props){
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout() {
        axios.get("http://localhost:8000/backend/logout/")
        .then(res => {
            if(res.status == "200")
            window.location.replace("http://localhost:8000/login");
        })
        //window.location.href ="http://localhost:8000/logout/"
        //window.location.replace("http://localhost:8000/login");
    }

    render() {
        return (
            <button onClick={this.handleLogout}>Log out</button>
        )
    }
}