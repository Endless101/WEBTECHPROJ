import React, {Component} from "react";
import { Rating } from 'react-simple-star-rating'
import axios from "axios";


export default class Review extends Component {
    constructor(props) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleRating = this.handleRating.bind(this)
        this.reviewstate = {name: "placeholder", rate: 0};
    }

    handleRating(rate) {
        this.reviewstate.rate = rate
        console.log(this.reviewstate.rate)
    }

    handleFormSubmit(event, requestType){
        //event.preventDefault();
        console.log(requestType)
        const country = document.getElementById("country").value
        const review = document.getElementById("review").value
        const rating = this.reviewstate.rate
        const params = new URLSearchParams()
        params.append('country', country)
        params.append('review',review)
        params.append('rating', rating.toString())
        console.log(review)
         axios.post("http://localhost:8000/backend/post/", params, {
            headers: {
                'Content-type':  'application/x-www-form-urlencoded'
            }
        })
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          setTimeout(() => {
            window.location.reload(true) 
          }, 500)
        }
        
          render() {
         return( <div>   
                <label> Country: </label> <input id="country" type="text"></input> <br></br>
                <label>Write your review : </label><br></br>
                <textarea name="review" id="review" type="text" cols="92" rows="15" defaultValue={this.props.text}></textarea><br></br>
                <Rating name="rating" onClick={this.handleRating}> {60}</Rating><br></br>
                <input type="submit" value="Post" onClick={this.handleFormSubmit}/>
                
                
                </div>
         )}
         
     };
