import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CoverPage extends Component {
  render() {
    return (
      <div className="cover-page">
        <h1>foodster</h1>
        <img src="./img/logo3.svg" alt="logo"/>
        <Link to='/login'>Login</Link>
        <hr/>
        <Link to='/signup'>or Signup</Link>
      </div>
    );
  }
}

export default CoverPage;