import React, {Component} from "react";
import CreateUser from './CreateUser';
import {BrowserRouter,
    Routes,
    Route, 
    Link, 
    Redirect
} from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (<BrowserRouter>
            <Routes>
                <Route exact path="/create" component={CreateUser}></Route>
            </Routes>
        </BrowserRouter>
        )
    }
}
