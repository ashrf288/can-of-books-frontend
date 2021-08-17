import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import BookCard from './components/card';
import AddBook from './components/BookFormModal';
import RemoveBook from './components/RemoveBook';
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
        <div style={{display:'flex' , gap:'30%' ,padding:'20px'}} >
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

      </Jumbotron>
      <AddBook/>
      </div>
      <RemoveBook/>
      {this.state.data&&<BookCard data={this.state.data}/>}
      
      </div>
    )
  }
}

export default MyFavoriteBooks;
