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
    followed: false,
    followersList: [],
    followingList: [],
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
    .then(() => {this.getFollowersList()})
    .then(() => {this.getFollowingList()})
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

  getFollowersList = () => {
    const { followers } = this.state.otherUser;
    followers.map(followerId => (
      profileService.getProfile(followerId)
      .then(follower => {
        this.setState({
          followersList : [...this.state.followersList, follower]
        })
      })
      .catch(err => console.log(err))
    ))
  }

  getFollowingList = () => {
    const { following } = this.state.otherUser;
    following.map(followingId => (
      profileService.getProfile(followingId)
      .then(following => {
        this.setState({
          followingList : [...this.state.followingList, following]
        })
      })
      .catch(err => console.log(err))
    ))
  }
    
  render() {
    const { otherUser: { _id, username, imageUrl }, 
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
        {(!followed) ?
        <button onClick={this.handleFollowers}>Follow</button> :
        <button onClick={this.handleFollowers}>Unfollow</button>
        }
        {/* <div className="profile-favorites">
          <h2>My favorites</h2>
            {favoritesList.map(favorite => (
              <>
                <p>{favorite.name}</p>
              </>
            ))}
        </div>
        <div className="profile-followers">
          <h2>My followers</h2>
          {followersList.map(follower => (
            <>
              <p>{follower.username}</p>
            </>
          ))}
        </div>
        <div className="profile-following">
          <h2>I'm following</h2>
        {followingList.map(following => (
          <>
            <p>{following.username}</p>
          </>
        ))}
        </div> */}
      </div>
    );
  }
}

export default withAuth(UserProfile);
