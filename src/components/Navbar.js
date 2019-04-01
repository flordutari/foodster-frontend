import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withAuth } from '../providers/AuthProvider';
import logoutImg from '../img/logout.png';
import arrowBack from '../img/back.png';

class Navbar extends Component {

  render() {
    const { user, logout } = this.props;
    const { tickets, imageUrl, username } = user;
    return (
      <nav>
        <div className="back-button">
          <img onClick={() => this.props.history.go(-1)}src={arrowBack} alt=""/>
        </div>
        <Link to="/profile">
          <div className="current-user">
            <p>{tickets}  <i className="fas fa-ticket-alt"></i></p>
            <p>{username}</p>
            <img src={imageUrl} alt="" />
          </div>
        </Link>
        <div className="logout-button">
          <img onClick={logout} src={logoutImg} alt=""/>
        </div>
      </nav>
    )
  }
}

export default withRouter(withAuth(Navbar));
