import React, { Component } from "react";
import { Form,Button } from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
class AddBook extends Component {
constructor(){
    super()
    this.state={
        title:'',
        email:'',
        status:'',
        description:''
    }
}

changeHndler=(e)=>{
    this.setState({
        [e.target.name]: e.target.value ,
        email:this.props.auth0.user.email
   })
}

submitHandler=(e)=>{
    e.preventDefault()
    console.log(this.state)
    if(this.props.auth0.isAuthenticated){
        this.props.auth0.getIdTokenClaims().then(res=>{
          const jwt=res.__raw;
          const config={
            headers:{"Authorization" : `Bearer ${jwt}`},
            method:'post',
            baseURL:process.env.REACT_APP_SERVER_URL,
            url:'/books/create',
            Body: this.state
          }
          axios(config).then(axiosResults=>console.log(axiosResults.data)).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
      }
    }



  render() {
    return (
      <div style={{ width: "300px" }}>
        <Form onSubmit={(e)=>this.submitHandler(e)}>
          <Form.Group className="mb-3" >
            <Form.Label>book name</Form.Label>
            <Form.Control type="text" onChange={(e)=>this.changeHndler(e)} placeholder="Enter book name" name='title' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>status</Form.Label>
            <Form.Control type="text" onChange={(e)=>this.changeHndler(e)} placeholder="status" name='status'/>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>book description</Form.Label>
            <textarea  onChange={(e)=>this.changeHndler(e)} placeholder='discription of the book' style={{width: '400px'}} name='description' />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withAuth0 (AddBook);
