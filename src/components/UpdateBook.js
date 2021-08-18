import React, { Component } from "react";
import { Form,Button,Modal } from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
class UpdateBook extends Component {
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
    let data={
      title:this.state.title,
      email:this.state.email,
      status:this.state.status,
      description:this.state.description,
  }
    console.log(this.state)
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0
        .getIdTokenClaims()
        .then((res) => {
          const jwt = res.__raw;
          const config = {
            headers: { Authorization: `Bearer ${jwt}` },
            method: "put",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: `/books/update/611bb086bb96312f8d68dbd0`,
            body:data,
          };
          axios(config)
            .then((axiosResults) => console.log(axiosResults.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
      this.clickHndler()
    }
    
    clickHndler=(e)=>{
      
      this.props.show(false)
    }


  render() {
    return (
      <div style={{ width: "300px" }}>
       <Modal.Dialog>
  <Modal.Header closeButton onClick={(e)=>this.clickHndler(e)}>
    <Modal.Title>update book</Modal.Title>
  </Modal.Header>

  <Modal.Body>
  <Form onSubmit={(e)=>this.submitHandler(e)}>
  <Form.Group className="mb-3" >
            <Form.Label>book id </Form.Label>
            <Form.Control type="text" value={this.props.id} onChange={(e)=>this.changeHndler(e)} placeholder="Enter book name" name='title' />
          </Form.Group>
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
            <textarea  onChange={(e)=>this.changeHndler(e)} placeholder='discription of the book' style={{width: '250px'}} name='description' />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
  </Modal.Body>

  <Modal.Footer>
    <Button onClick={(e)=>this.clickHndler(e)} variant="secondary">Close</Button>
    
  </Modal.Footer>
</Modal.Dialog>
      </div>
    );
  }
}

export default withAuth0 (UpdateBook);
