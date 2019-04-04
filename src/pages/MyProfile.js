import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import Rate from '../components/Rate';
import editLogo from '../img/edit.png';

class MyProfile extends Component {

  state = {
    followersList: [],
    followingList: [],
    boughtList: [],
    tuppers: []
  }

  componentDidMount = () => {
    this.getFollowersList();
    this.getFollowingList();
    this.getBoughtList();
    this.getTupperList();
  }

  getTupperList = () => {
    const { _id } = this.props.user;
    tupperService.getAll()
    .then(tuppers => {
      console.log(tuppers)
      const newTuppers = tuppers.filter(tupper => (tupper.available && tupper.creator === _id))
      this.setState({
        tuppers: newTuppers
      })
    })
    .catch(err => console.log(err));
  }

  getBoughtList = () => {
    const { bought } = this.props.user;
    bought.map(boughtId => (
      tupperService.getOne(boughtId)
      .then(boughtTupper => {
        if(!boughtTupper.rated) {
          this.setState({
            boughtList : [...this.state.boughtList, boughtTupper]
          })
        }
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
    const { boughtList, 
            followersList, 
            followingList, 
            tuppers } = this.state;
            console.log(tuppers);
    return (
      <div className="profile-page">
        <Link className="edit-logo" to={`./profile/edit`}><img src={editLogo} alt="edit"/></Link>
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
        </div>
        <div className="profile-social">
          <div className="profile-bought">
            <h4>To rate</h4>
            <div className="my-tupper-list">
              {boughtList.map(tupper => (
                <>
                  <Link to={`/tuppers/${tupper._id}`}><p>{tupper.name}</p></Link>
                </>
              ))}
            </div>
          </div>
          <div className="profile-my-tuppers">
            <h4>My tuppers</h4>
            <div className="my-tupper-list">
              {tuppers.map(tupper => (
                <Link to={`/tuppers/${tupper._id}`}><p>{tupper.name}</p></Link>
              ))}
            </div>
          </div>
          <div className="profile-followers">
            <h4>My followers</h4>
            <div>
              {followersList.map(follower => (
                <>
                  <Link to={`/profile/${follower._id}`}><img src={follower.imageUrl} alt=""/></Link>
                </>
              ))}
            </div>
          </div>
          <div className="profile-following">
            <h4>Who I'm following</h4>
            <div>
              {followingList.map(following => (
                <>
                  <Link to={`/profile/${following._id}`}><img src={following.imageUrl} alt=""/></Link>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(MyProfile);