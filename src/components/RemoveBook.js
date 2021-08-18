import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Form,Button,Modal } from "react-bootstrap";

export class RemoveBook extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
    };
  }

  changeHndler = (e) => {
    this.setState({ id: e.target.value.trim() });
  };

  clickHandler = (e) => {
    console.log(this.state.id.trim());
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
    this.clickHndler(e)
  };
  clickHndler=(e)=>{
      
    this.props.func(false)
  }
  render() {
    return (
      <div>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={(e)=>this.clickHndler(e)}>
            <Modal.Title>Remove book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>remove book by id</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => this.changeHndler(e)}
                placeholder="Enter book id"
                name="book id"
              />
            </Form.Group>
            <Button onClick={(e) => this.clickHandler(e)} variant="danger">
              REMOVE BOOK
            </Button>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={(e)=>this.clickHndler(e)}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default withAuth0(RemoveBook);
