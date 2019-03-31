import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class FootBar extends Component {
  render() {
    // const { user, logout } = this.props;
    // const { username } = user;
    return (
      <div id="footbar">
        <Link to="/"><img src="../img/search.svg" alt=""/></Link>
        <Link to="/"><img src="../img/like.svg" alt=""/></Link>
        <Link to="/tuppers/new"><img src="../img/plus.svg" alt=""/></Link>
        <Link to="/tuppers/all"><img src="../img/lunch-box.svg" alt=""/></Link>
        <Link to="/profile"><img src="../img/user.svg" alt=""/></Link>
      </div>
    )
  }
}

export default withAuth(FootBar);
