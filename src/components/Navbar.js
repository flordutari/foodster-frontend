import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {
  render() {
    const { user, logout } = this.props;
    const { username, imageUrl } = user;
    return (
      <nav>
        <div className="logout-button">
          <p onClick={logout}><i className="fas fa-chevron-left"></i></p>
        </div>
        <div className="current-user">
          <p>{username}</p>
          <img src={imageUrl} alt={username} />
        </div>
      </nav>
    )
  }
}

export default withAuth(Navbar);