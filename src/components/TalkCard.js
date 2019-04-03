import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import forwardArrow from '../img/forward.png';
import profileService from '../lib/profile-service';

class TalkCard extends Component {

  state = {
    talkPartner: {}
  }

  componentDidMount = () => {
    this.getTalkPartner();
  }

  getTalkPartner = () => {
    const { otherId } = this.props.talk;
    profileService.getProfile(otherId)
    .then(talkPartner => 
      this.setState({
        talkPartner
      })
    )
    .catch(err => console.log(err));
  }

  render() {
    const { username, imageUrl } = this.state.talkPartner;
    const { _id } = this.props.talk;
    return (
      <div className="talk-card">
        <div className="user-info">
          <img className="user-conv-card-img" src={imageUrl} alt=""/>
          <p>{username}</p>
        </div>
        <div>
          <Link to={`/talks/${_id}`}><img id="arrow-forward" src={forwardArrow} alt=""/></Link>
        </div>
      </div>
    );
  }
}

export default withAuth(TalkCard);
