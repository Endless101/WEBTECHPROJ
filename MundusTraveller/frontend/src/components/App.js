import React, {Component} from "react"
import {render} from "react-dom"
import CreateUser from "./CreateUser";
import GoogleLogin from "./GoogleLogin";
import Login from "./Login"

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<Login />);
    }
}

const appDiv = document.getElementById("app")
render(<App />, appDiv);