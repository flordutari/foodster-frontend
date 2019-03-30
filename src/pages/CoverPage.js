import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CoverPage extends Component {
  render() {
    return (
      <div className="cover-page">
        <div className="logo-cover">
          <img className="cover-logo" src="./img/logo1.svg" alt="logo"/>
          <h1>foodster</h1>
        </div>
        <Link className="login-link" to='/login'>Login</Link>
        <Link className="signup-link" to='/signup'>or Signup</Link>
      </div>
    );
  }
}

export default CoverPage;