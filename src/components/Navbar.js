import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {

  render() {
    const { user, logout } = this.props;
    const { username, imageUrl } = user;
    return (
      <nav>
        <div className="logout-button">
          <Link to="/tuppers"><img src="../img/back.svg" alt=""/></Link>
          <p onClick={logout}>Logout</p>
        </div>
        <Link to="/profile">
          <div className="current-user">
            <p>{username}</p>
            <img src={imageUrl} alt="" />
          </div>
        </Link>
      </nav>
    )
  }
}

export default withAuth(Navbar);