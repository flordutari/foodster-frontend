import React, { Component } from 'react';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';
import Rate from '../components/Rate';
import talksService from '../lib/talks-service';

class UserProfile extends Component {
  
  state = {
    otherUser: {},
    isLoading: true,
    followed: false
  }

  componentDidMount = () => {
    this.getUserProfile();
  }
  
  getUserProfile = () => {
    const { id } = this.props.match.params;
    profileService.getProfile(id)
    .then(otherUser => {
      this.setState({
        otherUser,
        isLoading: false
      })
    })
    .then(() => {this.checkIfFollowing()})
    .catch(err => console.log(err));
  }

  checkIfFollowing = () => {
    const otherUserId = this.state.otherUser._id;
    const { following } = this.props.user;
    let alreadyFollowing = false
    if(following.includes(otherUserId)) {
      alreadyFollowing = true 
      this.setState({
        followed: true
      })
    } else {
      alreadyFollowing = false
      this.setState({
        followed: false
      })
    }
    return alreadyFollowing;
  }

  handleFollowers = () => {
    const otherUserId = this.state.otherUser._id;
    const { followed } = this.state;
    if(followed === false){
      profileService.follow({
        otherUserId
      })
      .then(result => {
        const user = result.data.userFollow;
        const otherUser = result.data.userFollowed;
        this.props.setUser(user)
        this.setState({
          otherUser,
          followed: true,
        })
      })
      .catch(err => console.log(err));
    } else if (followed === true){
      profileService.unfollow({
        otherUserId
      })
      .then(result => {
        const user = result.data.userUnfollow;
        const otherUser = result.data.userUnfollowed;
        this.props.setUser(user)
        this.setState({
          otherUser,
          followed: false
        })
      })
      .catch(err => console.log(err));
    }
  }

  createTalk = () => {
    const guestId = this.state.otherUser._id;
    talksService.createTalk({guestId})
    .then(talk => {
      console.log(talk);
    })
    .catch(err => console.log(err));
  }
    
  render() {
    const { otherUser: { _id, username, imageUrl, description }, 
            isLoading, 
            followed, 
          } = this.state;
    return (
      (isLoading) ? <p>Loading...</p> :
      <div className="profile-page">
        <div className="profile-card">
          <img className="profile" src={imageUrl} alt={`${username}`}/>
          <div className="profile-text">
            <h2 className="profile">Hi, I'm {username}</h2>
            <div className="profile-rate">
              <Rate user={_id}/>
            </div>
            <p>0.3 km</p>
          </div>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
        {(followed === true) ?
        <button className="follow-button" onClick={this.handleFollowers}>Follow</button> :
        <button className="follow-button" onClick={this.handleFollowers}>Unfollow</button>
        }
        <button onClick={this.createTalk} className="send-message">chat</button>
      </div>
    );
  }
}

export default withAuth(UserProfile);
