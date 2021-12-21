/* React imports */
import React, {Component} from "react";
import axios from "axios";


export default class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
          errors: [{}],
      }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

  
    handleFormSubmit(event, requestType){
        //event.preventDefault();
        const country = document.getElementById("country").value
        const review = document.getElementById("review").value
        const params = new URLSearchParams()
        params.append('country', country)
        params.append('review',review)
    
        console.log(review)
         axios.post("http://localhost:8000/backend/post/", params, {
            headers: {
                'Content-type':  'application/x-www-form-urlencoded'
            }
        })
          .then(res =>{

           if(res.status == "200"){
              this.setState({
              errors: new Array(res.data)
            })
          }
            else if(res.status == "201") {
              setTimeout(() => {
                window.location.reload(true) 
              }, 500)
            }
        })

          .catch(function (error) {
            console.log(error);
          });
          /**/
        }
        
          render() {
         return( <div> 
                {this.state.errors[0].review} <br></br>  
                <label> Country: </label> <input id="country" type="text"></input> <br></br>
                <label> Review: </label> <br></br>
                <textarea name="review" id="review" type="text" cols="92" rows="15" placeholder={this.props.text}></textarea><br></br>
                <input type="submit" value="Post" onClick={this.handleFormSubmit}/>
                
                
                </div>
         )}
         
     };
