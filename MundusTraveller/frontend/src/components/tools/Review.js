/* React imports */
import React, {Component} from "react";
import axios from "axios";


export default class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
          errors: [{}],
      }
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    }

  /**
   * Getting all the information from the textarea and input field and sending them to the server via an AJAX post request.
   * When the post is successful we reload the page or else we will display the error messages returned from the server
   * @param {*} event 
   */
    handleReviewSubmit(event){
        const country = document.getElementById("country").value
        const review = document.getElementById("review").value
        const params = new URLSearchParams()
        params.append('country', country)
        params.append('review',review)
    
        
         axios.post("/backend/post/", params, {
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
        /**
         * 
         * @returns HTML div with an input field for writing the country and textarea for writing the review along with a submit button.
         */
          render() {
         return( <div> 
                {this.state.errors[0].review} <br></br>  
                <label> Country: </label> <input id="country" type="text"></input> <br></br>
                <label> Review: </label> <br></br>
                <textarea name="review" id="review" type="text" cols="92" rows="15" placeholder={this.props.text}></textarea><br></br>
                <input type="submit" value="Post" onClick={this.handleReviewSubmit}/>
                
                
                </div>
         )}
         
     };
