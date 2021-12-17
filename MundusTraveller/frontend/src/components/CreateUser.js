import React, {Component} from "react";
import axios from "axios";


export default class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = (event, requestType) => {
       //event.preventDefault();
        const name = event.target.elements.name.value;
        switch ( 'post' ) {
            case 'post':
                console.log('ddddddddddddd')
                axios.post('http://localhost:5555/backend/add', {
                    name: name
                },{
                    headers: {
                        'content-type': 'raw'
                    }
                })
                .then(res => console.log(res))
                .catch(err => console.err(error))
        }
    };


render () {
    return (<form /*onSubmitCapture={this.handleFormSubmit}*/ method="post" action="backend/add/" content="raw">
        
        <label>Firstname: <input name="firstname" id="firstname" type="text"></input> </label><br></br>
        <label>Lastname: <input name="lastname" id="lastname" type="text"></input></label><br></br>
        <label>Username: <input name="username" id="username" type="text"></input></label><br></br>
        <label>Password: <input name="password" id="password" type="password"></input></label><br></br>
        <label>Confirm password: <input name="password" id="password" type="password"></input></label><br></br>
        <label>Email: <input name="email" id="email" type="email"></input></label><br></br>
        <label>Date of birth: <input name="DOB" id="DOB" type="date"></input></label><br></br>
        <label>Submit: <input type="submit" value="Submit"></input> </label>
    </form>)
}

}