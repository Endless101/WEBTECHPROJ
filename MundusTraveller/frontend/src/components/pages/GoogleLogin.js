import React,{Component} from "react"

export default class GoogleLogin extends Component {
    constructor(props) {
        super(props)
    }

    onSignIn(googleUser) {
        console.log('zefezfzefze')
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      }
      

    render() {
        return(<div class="g-signin2" data-onsuccess="onSignIn"></div>
        )
    }
}