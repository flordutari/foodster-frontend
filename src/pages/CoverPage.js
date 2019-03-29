import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CoverPage extends Component {
  render() {
    return (
      <div className="cover-page">
        <img className="cover-logo" src="./img/logo3.svg" alt="logo"/>
        <h1>foodster</h1>
        <Link className="login-button" to='/login'>Login</Link>
        <hr/>
        <Link to='/signup'>Don't have an account yet? <br/> Signup</Link>
      </div>
    );
  }
}

export default CoverPage;