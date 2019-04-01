import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import Rate from '../components/Rate';

class MyProfile extends Component {

  state = {
    favoritesList: [],
    followersList: [],
    followingList: [],
    boughtList: []
  }

  componentDidMount = () => {
    this.getFavoritesList();
    this.getFollowersList();
    this.getFollowingList();
    this.getBoughtList();
  }

  getBoughtList = () => {
    const { bought } = this.props.user;
    bought.map(boughtId => (
      tupperService.getOne(boughtId)
      .then(bought => {
        this.setState({
          boughtList : [...this.state.boughtList, bought]
        })
      })
      .catch(err => console.log(err))
    ))
  }

  getFavoritesList = () => {
    const { favorites } = this.props.user;
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
    const { followers } = this.props.user;
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
    const { following } = this.props.user;
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
    const { username, imageUrl, _id } = this.props.user;
    // const { favoritesList, followersList, followingList } = this.state;
    const { boughtList } = this.state;
    return (
      <div className="profile-page">
        <div className="profile-card">
          <img className="profile" src={imageUrl} alt={`${username}`}/>
          <div className="profile-text">
            <h2 className="profile">{username}</h2>
            <div className="profile-rate">
              <Rate 
              user={_id}/>
            </div>
            <p>0.3 km</p>
          </div>
          <Link to={`./profile/edit`}><i className="fas fa-edit"></i></Link>
        </div>
        <div className="profile-favorites">
          <h2>To rate</h2>
            {boughtList.map(item => (
              <>
                <Link to={`/tuppers/${item._id}`}><p>{item.name}</p></Link>
              </>
            ))}
        </div>
        {/* <div className="profile-favorites">
          <h2>My favorites</h2>
            {favoritesList.map(favorite => (
              <>
                <p>{favorite.name}</p>
              </>
            ))}
        </div> */}
        {/* <div className="profile-followers">
          <h2>My followers</h2>
          {followersList.map(follower => (
            <>
              <Link to={`/profile/${follower._id}`}><img src={follower.imageUrl} alt=""/></Link>
            </>
          ))}
        </div>
        <div className="profile-following">
          <h2>I'm following</h2>
        {followingList.map(following => (
          <>
            <Link to={`/profile/${following._id}`}><img src={following.imageUrl} alt=""/></Link>
          </>
        ))}
        </div> */}
      </div>
    );
  }
}

export default withAuth(MyProfile);