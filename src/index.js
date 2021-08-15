import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
// TODO: wrap everything in Auth0
ReactDOM.render(
  <Auth0Provider
    domain="dev-gdbzk74s.us.auth0.com"
    clientId="TUsVws47p3NZzAQXFpC4fd4ed6hwrxFK"
    redirectUri={window.location.origin}
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
   </Auth0Provider>,
  document.getElementById('root')
);
