import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import UpdateBook from "./UpdateBook";
class BookCard extends Component {

  constructor(){
    super()
    this.state={
      id:'',
      show:false
    }
  }

  clickHandler=(e,bookId)=>{
    let state=this.state
    state.id=bookId;
    this.setState(state)
    e.preventDefault();
    console.log(this.state);
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0
        .getIdTokenClaims()
        .then((res) => {
          const jwt = res.__raw;
          const config = {
            headers: { Authorization: `Bearer ${jwt}` },
            method: "delete",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: `/books/remove/${this.state.id}`,
          };
          axios(config)
            .then((axiosResults) => console.log(axiosResults.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
    console.log(this.state.id);
  }

  updatekHandlerR=()=>{
    this.setState({show:true})

  }
  closeForm=(bool)=>{
    this.setState({show:bool})

  }

  render() {
    return (
      <div>
        <Carousel>
          {this.props.data.map((book) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.cjr.org/wp-content/uploads/2017/04/book-pages.jpeg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <h3>{book._id}</h3>
                  <p>{book.description}</p>
                  <Button onClick={(e) => this.clickHandler(e,book._id)} variant="danger">
                REMOVE BOOK
              </Button>
              <div>
              <Button onClick={(e)=>this.updatekHandlerR(e)} variant="primary">Update BOOK</Button>
                   {this.state.show&&<UpdateBook  show={this.closeForm}  id={book._id}/>}
              </div>
             
                </Carousel.Caption>
              </Carousel.Item>
              
            );
          
          })}
        </Carousel>
        
      </div>
    );
  }
}

export default withAuth0(BookCard) ;
