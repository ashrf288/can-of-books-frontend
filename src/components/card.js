import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

class BookCard extends Component {
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
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        
      </div>
    );
  }
}

export default BookCard;
