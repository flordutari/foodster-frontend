import React, { Component } from 'react';
import authService from '../lib/auth-service';
import profileService from '../lib/profile-service';
import tupperService from '../lib/tupper-service';
import { withAuth } from '../providers/AuthProvider';

class UserProfile extends Component {
  
  state = {
    otherUser: {},
    user: {},
    isLoading: true,
    followed: false,
    favoritesList: [],
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
    .then(() => {this.getFavoritesList()})
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
        console.log(user)
        console.log(otherUser)
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
        console.log(user)
        console.log(otherUser)
      })
      .catch(err => console.log(err));
    }
  }

  getFavoritesList = () => {
    const { favorites } = this.state.otherUser;
    console.log(favorites)
    favorites.map(favoriteId => (
      tupperService.getOne(favoriteId)
      .then(favorite => {
        this.setState({
          favoritesList : [...this.state.favoritesList, favorite]
        })
      })
      .catch(err => console.log(err))
    ))
  }

  getFollowersList = () => {
    const { followers } = this.state.otherUser;
    console.log(followers)
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
    console.log(following)
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
    const { otherUser: { username, imageUrl }, 
            isLoading, 
            followed, 
            favoritesList,
            followersList,
            followingList
          } = this.state;
    return (
      (isLoading) ? <p>Loading...</p> :
      <div className="profile-page">
        <div className="profile-card">
          <img className="profile" src={imageUrl} alt={`${username}`}/>
          <div className="profile-text">
            <h2 className="profile">Hi, I'm {username}</h2>
            <div className="profile-valoration">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p>0.3 km</p>
          </div>
        </div>
        {(!followed) ?
        <button onClick={this.handleFollowers}>Follow</button> :
        <button onClick={this.handleFollowers}>Unfollow</button>
        }
        <div className="profile-favorites">
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
        </div>
      </div>
    );
  }
}

export default withAuth(UserProfile);
