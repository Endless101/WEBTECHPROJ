import React, {Component} from "react"
import {render} from "react-dom"
import CreateUser from "./CreateUser";
import GoogleLogin from "./GoogleLogin";

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
<<<<<<< HEAD
        return (<h1> Testing React Dode</h1>);
=======
        return (<GoogleLogin />);
>>>>>>> origin/taoufik_Login
    }
}

const appDiv = document.getElementById("app")
render(<App />, appDiv);