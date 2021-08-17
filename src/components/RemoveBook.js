import React, { Component } from 'react';
import { Button,Form } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
export class RemoveBook extends Component {
constructor(){
    super()
    this.state={
        id:''
    }
}



    changeHndler=(e)=>{
        this.setState({id:e.target.value.toString()})
    }

    clickHandler=(e)=>{
        console.log(this.state.id)
        e.preventDefault()
        console.log(this.state)
        if(this.props.auth0.isAuthenticated){
            this.props.auth0.getIdTokenClaims().then(res=>{
              const jwt=res.__raw;
              const config={
                headers:{"Authorization" : `Bearer ${jwt}`},
                method:'delete',
                baseURL:process.env.REACT_APP_SERVER_URL,
                url:`/books/remove/:_${this.state.id}`,
                
              }
              axios(config).then(axiosResults=>console.log(axiosResults.data)).catch(err=>console.log(err));
            }).catch(err=>console.log(err));
          }
        }


    render() {
        return (
            <div>
                <Form.Group className="mb-3" >
            <Form.Label>remove book by id</Form.Label>
            <Form.Control type="text" onChange={(e)=>this.changeHndler(e)} placeholder="Enter book id" name='book id' />
          </Form.Group>
                <Button onClick={(e)=>this.clickHandler(e)} variant="danger">REMOVE BOOK</Button>
            </div>
        )
    }
}

export default withAuth0(RemoveBook) ;
