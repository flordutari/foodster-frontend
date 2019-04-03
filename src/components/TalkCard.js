import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import forwardArrow from '../img/forward.png';

class TalkCard extends Component {
  render() {
    return (
      <div className="talk-card">
        <div className="user-info">
          <img className="user-conv-card-img" src="../img/default-profile.png" alt=""/>
          <p>nombre</p>
        </div>
        <div>
          <Link to='/'><img id="arrow-forward" src={forwardArrow} alt=""/></Link>
        </div>
      </div>
    );
  }
}

export default withAuth(TalkCard);
