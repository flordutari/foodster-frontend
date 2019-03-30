import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import authService from '../lib/auth-service';
import profileService from '../lib/profile-service';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class TupperDetail extends Component {

  state = {
    user: {},
    tupper: {},
    creatorUser: {},
    isLoading: true,
    favorite: false
  }

  componentDidMount() {
    this.getTupperToBuy();
    this.getCurrentUser();
  }
  
  getTupperToBuy = () => {
    const { id } = this.props.match.params;
    tupperService.getOne(id)
      .then(tupper => {
        this.setState({
          tupper,
          isLoading: false
        })
      })
      .then(() => {this.getCreator()})
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
      .then(() => {this.favoriteToggle()})
      .catch(err => console.log(err));
  }
  
  getCreator = () => {
    const { creator } = this.state.tupper;
    profileService.getProfile(creator)
      .then(creatorUser => {
        this.setState({
          creatorUser,
          isLoading: false
        })
    })
      .catch(err => console.log(err));
  }

  handleTransaction = () => {
    const { id } = this.props.match.params;
    const { tickets: buyerTickets, _id: buyerId } = this.state.user;
    const { tickets: creatorTickets, _id: creatorId } = this.state.creatorUser;
    const { price: tupperPrice, available } = this.state.tupper;
    if (buyerTickets >= tupperPrice) {
      tupperService.tupperPurchase({
        available,
        buyerId,
        buyerTickets: (buyerTickets - tupperPrice),
        creatorTickets: (creatorTickets + tupperPrice),
        creatorId
      },
      id)
      .then((result) => {
        console.log(result);
        this.props.history.push('/tuppers');
      })
      .catch(err => console.log(err));
    }
  }

  favoriteToggle = () => {
    const tupperId = this.state.tupper._id;
    const { favorites } = this.state.user;
    if(favorites.includes(tupperId)) {
      this.setState({favorite: true})
    } else {
      this.setState({favorite: false})
    }
  }
  
  handleFavorite = () => {
    const tupperId = this.state.tupper._id;
    const { favorites } = this.state.user;
    let isAlreadyFavorite = false;
    if(favorites.includes(tupperId)) {
      isAlreadyFavorite = true
      this.setState({favorite: true})
    } 
    if(isAlreadyFavorite === false){
      profileService.addFavorite({
        tupperId
      })
      .then(result => {
        const user = result.data.userAddFavorite;
        this.setState({
          favorite: true,
          user
        })
      })
      .catch(err => console.log(err));
    } else if (isAlreadyFavorite === true){
      profileService.undoFavorite({
        tupperId
      })
      .then(result => {
        const user = result.data.userUndoFavorite;
        this.setState({
          favorite: false,
          user
        })
      })
      .catch(err => console.log(err));
    }
  }
 
  handleDelete = () => {
    const { id } = this.props.match.params;
    tupperService.deleteTupper(id)
    .then(result => {
      console.log(result);
      this.props.history.push('/tuppers');
      })
      .catch(err => console.log(err));
  }

  render() {
    const { tupper:{name, _id, creator, imageUrl, price}, creatorUser, isLoading, favorite } = this.state;
    return (
      (isLoading) ? <p>Loading...</p> :
      <div className="tupper-detail-page">
        <img src={imageUrl} alt=""/>
        <h2>{name}</h2>
        <div className="chef">
          <p>Chef: {creatorUser.username}</p>
          <div className="handle-image">
            <img src={creatorUser.imageUrl} alt=""/>
          </div>
        </div>
        <div>
          <p className="distance">0.3 km - </p>
          <p>{price}  <i className="fas fa-ticket-alt"></i></p>
        </div>
        {(creator === (this.props.user._id)) ?
        <>
          <Link to={`./${_id}/edit`}><i className="fas fa-edit"></i></Link> 
          <button onClick={this.handleDelete}><i className="far fa-trash-alt"></i></button> 
        </> :
        <>
          {(!favorite) ?
            <button className="icon-button" onClick={this.handleFavorite}><i className="far fa-heart"></i></button> :
            <button className="icon-button" onClick={this.handleFavorite}><i className="fas fa-heart"></i></button>}
          <button className="icon-button" onClick={this.handleTransaction}>I want it!</button>
        </>}
      </div>
    );
  }
}

export default withAuth(TupperDetail);