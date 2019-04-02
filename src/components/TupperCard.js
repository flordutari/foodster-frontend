import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Rate from '../components/Rate';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';
import emptyHeart from '../img/like-empty.png';
import redHeart from '../img/like-red.png';

class TupperCard extends Component {

  state ={
    tupperCreator: {},
    isLoading: true,
    favorite: false
  }

  componentDidMount = () => {
    this.getTupperCreator();
    this.checkIfFavorite();
  }

  getTupperCreator = () => {
    const { creator } = this.props.tupper;
    profileService.getProfile(creator)
    .then((user) => {
      this.setState({
        tupperCreator: user
      })
    })
    .catch(error => console.log(error))
  }

  checkIfFavorite = () => {
    const { favorites } = this.props.user;
    const { _id } = this.props.tupper;
    let alreadyFavorite = false
    if(favorites.includes(_id)) {
      alreadyFavorite = true 
      this.setState({
        favorite: true
      })
    } else {
      alreadyFavorite = false
      this.setState({
        favorite: false
      })
    }
    return alreadyFavorite;
  }

  handleFavorite = () => {
    const tupperId = this.props.tupper._id;
    const { favorite } = this.state;
    if(favorite === false){
      profileService.addFavorite({
        tupperId
      })
      .then(result => {
        const user = result.data.userAddFavorite;
        this.props.setUser(user)
        this.setState({
          favorite: true
        })
      })
      .catch(err => console.log(err));
    } else if (favorite === true){
      profileService.undoFavorite({
        tupperId
      })
      .then(result => {
        const user = result.data.userUndoFavorite;
        this.props.setUser(user)
        this.setState({
          favorite: false,
        })
      })
      .catch(err => console.log(err));
    }
  }

  render() {
    const { tupper: {name, _id, imageUrl, price, creator} } = this.props;
    const { favorite } = this.state;
    const image = this.state.tupperCreator.imageUrl;
    return (
      <div className="tupper-card">
        {(favorite === false) ?
        <img onClick={this.handleFavorite} id="fav-empty" src={emptyHeart} alt="like"/> :
        <img onClick={this.handleFavorite} id="fav-red" src={redHeart} alt="like"/>}
        <Link to={`/tuppers/${_id}`}>
          <img src={imageUrl} alt="tupper" />
          <h3>{name}</h3>
          <div>
            <p className="distance">0.3 km - </p>
            <p>{price}  <i className="fas fa-ticket-alt"></i></p>
          </div>
          <div className="rate">
            <img src={image} alt="creator"/>
            <Rate 
            user={creator}
            />
          </div>
        </Link>
      </div>
    );
  }
}

export default withAuth(TupperCard);
