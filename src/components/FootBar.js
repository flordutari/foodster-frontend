import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class FootBar extends Component {
  render() {
    // const { user, logout } = this.props;
    // const { username } = user;
    return (
      <div id="footbar">
        <Link to="/"><i className="fas fa-search"></i></Link>
        <Link to="/"><i className="far fa-heart"></i></Link>
        <Link to="/tuppers/new"><i className="fas fa-plus-circle"></i></Link>
        <Link to="/"><i className="far fa-comment-alt"></i></Link>
        <Link to="/profile"><i className="fas fa-user-circle"></i></Link>
      </div>
    )
  }
}

export default withAuth(FootBar);
