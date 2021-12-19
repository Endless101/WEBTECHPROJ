import React, {Component} from "react";
import { Rating } from "react-simple-star-rating"
import axios from "axios";
import Review from "./Review";


export default class ReviewList extends Component {
    constructor(props) {
        super(props)
        this.handleLike = this.handleLike.bind(this)
        this.deleteReview = this.deleteReview.bind(this)
        this.filterReviews = this.filterReviews.bind(this)
        this.dostuff = this.dostuff.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleRating = this.handleRating.bind(this)
        this.data = []
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
          };
        this.reviewstate = {name: "placeholder", rate: 0};
    }
    componentDidMount() {
        fetch("../backend/post")
        .then(response => response.json())
        .then(data =>this.setState({
            data: data
    },
    () => console.log(this.state.data)))
        
}

    dostuff() {
        console.log("hehe")
    }
    
    handleLike(){
        console.log("hehe")
    }

    handleUpdate(event) {
        event.target.value
        const id = event.target.parentNode.id
        const el = document.getElementById(id)
        const oldContent = el.textContent.substring(el.textContent.indexOf(":") + 2, el.textContent.length)
        console.log(oldContent)
        const div = document.createElement("div")
        const newEl = document.createElement("textarea")
        const updateButton = document.createElement("input")
        div.append(newEl,updateButton)
        updateButton.value = "Update"
        updateButton.onclick = function(event) { 
           const newContent = event.target.parentNode.children[0].value
           const params = new URLSearchParams
           params.append('oldContent', oldContent)
           params.append('newContent', newContent)
           axios.put("http://localhost:8000/backend/post/",{
               "oldContent": oldContent,
               "newContent": newContent
           }, {
            headers: {
                'Content-type':  'application/json'
            }
        })
     setTimeout(() => {
            window.location.reload(true) 
          }, 500)
          
        }
        updateButton.type = "submit"
        newEl.defaultValue = oldContent
        el.parentNode.replaceChild(div, el)


    }

     
    handleRating(rate) {
        this.reviewstate.rate = rate
        console.log(this.reviewstate.rate)
    }

    handleFormSubmit(event, requestType){
        //event.preventDefault();
        console.log(requestType)
       
        const review = document.getElementById("review").value
        const rating = this.reviewstate.rate
        const params = new URLSearchParams()
        params.append('review',review)
        params.append('rating', rating.toString())
        console.log(review)
         axios.post("http://localhost:8000/backend/post/", params, {
            headers: {
                'Content-type':  'application/x-www-form-urlencoded'
            }
        }
        )
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
    
         
     };


     deleteReview(event) {
        const el = event.target.parentNode
        const review = el.textContent.substring(el.textContent.indexOf(":") + 1, el.textContent.length)
        axios.delete("http://localhost:8000/backend/post/", {
           data:  {
            review:review
        }
    },
        {
            headers: {
                'Content-type':  'application/json'

            }
        })
        event.target.parentNode.remove()
    }
    filterReviews() {
        var arr = []
        var idx = 0
        const filter = this.props.filter
        const owner = this.props.owner
        const key = this.props.keys
        for(var propss in this.state.data) {
            if(filter == "country") {
                if(key == this.state.data[propss].country )
                arr.push({propss: this.state.data[propss].review,
                    user: this.state.data[propss].username,
                    likes:this.state.data[propss].likes,
                    id: idx})
            }
            else if(filter == "user") {
                if(key == this.state.data[propss].email)
                arr.push({propss: this.state.data[propss].review,
                    user: this.state.data[propss].username,
                    likes:this.state.data[propss].likes,
                    id: idx})
            }
            idx = idx + 1
        }
        return arr
    }


    render() {
        var arr = this.filterReviews()
        console.log(arr)

        return (
            <div>
                <ul> 
                    {arr.map( review => {
                        if(this.props.owner == "true")
                        return (
                            <li key={review.id} id={review.id} > {review.user}: {review.propss}
                            <input type="submit" value="Edit" onClick={this.handleUpdate} />
                            <input id={"delete"+review.id} type="submit" value="Delete" onClick={this.deleteReview}/>
                            </li> 
                        )
                        else return(<li key={review.id} id={review.id} >{review.user}: {review.propss}
                           <label> Amount of Likes: {review.likes} <button onClick={() => {
                               axios.post("http://localhost:8000/backend/likes/", {
                                    writer: review.user,
                                    review: review.propss
                               },
                               {
                                   headers: {
                                    'Content-type':  'application/json'
                                   }
                               })
                               .then(res=> {
                                   if(res.status == "200") {
                                       window.location.reload()
                                   }
                               })
                               .catch(err => {
                                   if(err.status == "304")
                                   console.log("You already liked that")
                               })
                            }
                        }>Like!</button></label> </li> )
                    })}
                </ul>
            <Review id="Review" text="Enter your review here"/>
            </div>

        )
            /*<div>   
                <label>Write your review : </label><br></br>
                <textarea name="review" id="review" type="text" cols="92" rows="15"></textarea><br></br>
                <Rating name="rating" onClick={this.handleRating}/><br></br>
                <input type="submit" value="Post" onClick={this.handleFormSubmit}/>
                
                
            </div>*/
        
    }
}