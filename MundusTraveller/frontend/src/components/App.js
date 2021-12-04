import React, {Component} from "react"
import {render} from "react-dom"
import CreateUser from "./CreateUser";
import GoogleLogin from "./GoogleLogin";

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<GoogleLogin />);
    }
}

const appDiv = document.getElementById("app")
render(<App />, appDiv);