import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import BookCard from './components/card';
class MyFavoriteBooks extends React.Component {
  constructor(){
    super()
    this.state={
      data:[]
    }
  }
  componentDidMount=()=>{

 axios.get('http://localhost:8000/books').then(resp=>{
      this.setState({data:resp.data})
      console.log(this.state.data);
 })
  }
  render() {
    return(
      <div>
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

      </Jumbotron>
      {this.state.data&&<BookCard data={this.state.data}/>}
      
      </div>
    )
  }
}

export default MyFavoriteBooks;
