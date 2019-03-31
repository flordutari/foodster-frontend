import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {

  render() {
    const { user, logout } = this.props;
    const { tickets, imageUrl } = user;
    return (
      <nav>
        <div className="logout-button">
          <Link to="/tuppers"><img src="../img/back.svg" alt=""/></Link>
          <p onClick={logout}>Logout</p>
        </div>
        <Link to="/profile">
          <div className="current-user">
            <p>{tickets}  <i className="fas fa-ticket-alt"></i></p>
            <img src={imageUrl} alt="" />
          </div>
        </Link>
      </nav>
    )
  }
}

export default withAuth(Navbar);
