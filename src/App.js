import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Embed from './Embed';
import './App.css';

import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';

import { withAuthenticator } from 'aws-amplify-react';

import awsconfig from './aws-exports';

Auth.configure(awsconfig);
Amplify.configure(awsconfig)

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Embed} exact />
      </div>
    </Router>
  );
}

//export default App;
export default withAuthenticator(App);