import React, { Component } from 'react';
import authService from '../lib/auth-service';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';
import Rate from '../components/Rate';

class UserProfile extends Component {
  
  state = {
    otherUser: {},
    user: {},
    isLoading: true,
    followed: false
  }

  componentDidMount = () => {
    this.getUserProfile();
    this.getCurrentUser();
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
    .catch(err => console.log(err));
  }
  
  getCurrentUser = () => {
    authService.me()
    .then(user => {
      this.setState({
        user,
        isLoading: false
      })
    })
    .then(() => {this.followerToggle()})
    .catch(err => console.log(err));
  }

  followerToggle = () => {
    const otherUserId = this.state.otherUser._id;
    const { following } = this.state.user;
    if(following.includes(otherUserId)) {
      this.setState({followed: true})
    } else {
      this.setState({followed: false})
    }
  }

  handleFollowers = () => {
    const otherUserId = this.state.otherUser._id;
    const { following } = this.state.user;
    let alreadyFollowing = false;
    if(following.includes(otherUserId)) {
      alreadyFollowing = true;
      this.setState({following: true})
    }
    if(alreadyFollowing === false){
      profileService.follow({
        otherUserId
      })
      .then(result => {
        const user = result.data.userFollow;
        const otherUser = result.data.userFollowed;
        this.setState({
          otherUser,
          user,
          followed: true,
        })
        this.props.setUser(user)
      })
      .catch(err => console.log(err));
    } else if (alreadyFollowing === true){
      profileService.unfollow({
        otherUserId
      })
      .then(result => {
        const user = result.data.userUnfollow;
        const otherUser = result.data.userUnfollowed;
        this.setState({
          otherUser,
          user,
          followed: false
        })
        this.props.setUser(user)
      })
      .catch(err => console.log(err));
    }
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
        {(!followed) ?
        <button className="follow-button" onClick={this.handleFollowers}>Follow</button> :
        <button className="follow-button" onClick={this.handleFollowers}>Unfollow</button>
        }

      </div>
    );
  }
}

export default withAuth(UserProfile);
