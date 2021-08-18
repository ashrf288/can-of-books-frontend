import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import BookCard from './components/card';
import AddBook from './components/BookFormModal';
import RemoveBook from './components/RemoveBook';
import { Button } from 'react-bootstrap';
class MyFavoriteBooks extends React.Component {
  constructor(){
    super()
    this.state={
      data:[],
      show:false,
      showR:false
    }
  }
  clickHandler=(()=>{
    this.setState({show:true,showR:false})
  })
  clickHandlerR=(()=>{
    this.setState({showR:true,show:false})
  })
  closeModal=(bool)=>{
    this.setState({show:bool})
  }
  closeModalR=(bool)=>{
    this.setState({showR:bool})
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
      {this.state.show&&<AddBook func={this.closeModal}/>}
      {this.state.showR&&<RemoveBook func={this.closeModalR}/>}
      
      </div>
      <Button onClick={(e)=>this.clickHandler(e)} variant="primary">ADD BOOK</Button>
      <Button onClick={(e)=>this.clickHandlerR(e)} variant="primary">Remove BOOK</Button>
      
     
      {this.state.data&&<BookCard data={this.state.data}/>}
      
      </div>
    )
  }
}

export default MyFavoriteBooks;
