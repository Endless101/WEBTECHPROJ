import React, { Component } from "react";
import { render } from "react-dom";
import CreateUser from "./CreateUser";
import  HomePage from "./HomePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

 // componentDidMount() {
  //  fetch("api/lead")
   //   .then(response => {
     //   if (response.status > 400) {
       //   return this.setState(() => {
        //    return { placeholder: "Something went wrong!" };
         // });
       // }
       // return response.json();
      //})
      //.then(data => {
       // this.setState(() => {
        //  return {
          //  data,
           // loaded: true
          //};
        //});
      //});
  //}

  render() {
    return (
      <HomePage/>
    )
  }
}




export default App;

const container = document.getElementById("app");
render(<App />, container);