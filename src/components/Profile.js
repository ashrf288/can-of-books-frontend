import React, { Component } from 'react'
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';
import MyFavoriteBooks from '../BestBooks';

class Profile extends Component {

  componentDidMount=()=>{
    if(this.props.auth0.isAuthenticated){
      this.props.auth0.getIdTokenClaims().then(res=>{
        const jwt=res.__raw;
        const config={
          headers:{"Authorization" : `Bearer ${jwt}`},
          method:'get',
          baseURL:process.env.REACT_APP_SERVER_URL,
          url:'/test'
        }
        axios(config).then(axiosResults=>console.log(axiosResults.data)).catch(err=>console.log(err));
      }).catch(err=>console.log(err));
    }
  }

  render() {
    return (
      <div>
        <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.name} />
      <h2>{this.props.auth0.user.name}</h2>
      <p>{this.props.auth0.user.email}</p>
     
      <MyFavoriteBooks/>
      </div>
    )
  }
}

export default withAuth0(Profile)
