import React from "react";
import Header from "./Header";
import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import Profile from './components/Profile'
import MyFavoriteBooks from './BestBooks';
import LoginButton from "./components/LoginButton";
class App extends React.Component {

  render() {
    console.log("app", this.props);
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header data={ this.props.auth0} />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */
                this.props.auth0.isAuthenticated&&<MyFavoriteBooks/>
                }
              </Route>
              <Route exact path="/profile">
               {this.props.auth0.isAuthenticated && <Profile /> } 
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
        <h1>hello</h1>
        <LoginButton/>
      </>
    );
  }
}

export default withAuth0(App);




