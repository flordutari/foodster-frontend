import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import profileService from '../lib/profile-service';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class TupperDetail extends Component {

  state = {
    user: {},
    tupper: {},
    creatorUser: {},
    isLoading: true,
    favorite: false,
    alreadyFavorite: false
  }

  componentDidMount() {
    this.getTupperToBuy();
  }
  
  getTupperToBuy = () => {
    const { id } = this.props.match.params;
    tupperService.getOne(id)
    .then(tupper => {
      this.getCreator(tupper)
    })
    .catch(err => console.log(err));
  }

  getCreator = (tupper) => {
    profileService.getProfile(tupper.creator)
    .then(creatorUser => {
      this.setState({
        tupper,
        creatorUser,
        isLoading: false
      })
    })
      .then(() => {this.checkIfFavorite()})
    .catch(err => console.log(err));
  }

  handleTransaction = () => {
    const { id } = this.props.match.params;
    const { tickets: buyerTickets, _id: buyerId } = this.props.user;
    const { tickets: creatorTickets, _id: creatorId } = this.state.creatorUser;
    const { price: tupperPrice, available, _id } = this.state.tupper;
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
        this.props.history.push(`/tuppers/${_id}/transaction`);
      })
      .catch(err => console.log(err));
    }
  }

  checkIfFavorite = () => {
    const { favorites } = this.props.user;
    const { _id } = this.state.tupper;
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
    const tupperId = this.state.tupper._id;
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

  handleStatus = (value) => {
    const { status, _id } = this.state.creatorUser;
    const {_id: tupperId, rated } = this.state.tupper;
    let newStatus = 0;
    if(status === 0){
      newStatus = value
    } else {
      newStatus = (status + value) / 2;
    }
    profileService.rateUser({
      _id,
      status: newStatus,
      rated,
      tupperId
    })
    .then(result => {
      console.log(result);
      this.props.history.push('/tuppers/all')
    })
    .catch(err => console.log(err));
  }

  handleDelete = () => {
    const { id } = this.props.match.params;
    tupperService.deleteTupper(id)
    .then(result => {
      console.log(result);
      this.props.history.push('/profile');
    })
    .catch(err => console.log(err));
  }

  render() {
    const { tupper:{name, _id, creator, imageUrl, price, available, rated}, creatorUser, isLoading, favorite } = this.state;
    const currentUserId = this.props.user._id;
    return (
      (isLoading) ? <p>Loading...</p> :
        <div className="tupper-detail-page">
          <img src={imageUrl} alt=""/>
          <h2>{name}</h2>
          {(creator !== currentUserId) ?
          <div className="chef">
            <p>Chef: {creatorUser.username}</p>
            <div className="handle-image">
              <Link to={`/profile/${creatorUser._id}`}><img src={creatorUser.imageUrl} alt=""/></Link>
            </div>
          </div> : 
          null
          }
          <div>
            <p className="distance">0.3 km - </p>
            <p>{price}  <i className="fas fa-ticket-alt"></i></p>
          </div>
          {(available) ? 
          <div>
            {(creator === (this.props.user._id)) ?
            <>
              <Link to={`./${_id}/edit`}><i className="fas fa-edit"></i></Link> 
              <button onClick={this.handleDelete}><i className="far fa-trash-alt"></i></button> 
            </> :
            <>
              {(favorite === false) ?
                <button className="icon-button" onClick={this.handleFavorite}><i className="far fa-heart"></i></button> :
                <button className="icon-button" onClick={this.handleFavorite}><i className="fas fa-heart"></i></button>}
              <button className="icon-button" onClick={this.handleTransaction}>I want it!</button>
            </>}
          </div>
          : null}
          <div>
            {(!available && !rated) ? 
            <>
              <p>Rate it!</p> 
              <p onClick={() => {this.handleStatus(1)}}>1</p>
              <p onClick={() => {this.handleStatus(2)}}>2</p>
              <p onClick={() => {this.handleStatus(3)}}>3</p>
              <p onClick={() => {this.handleStatus(4)}}>4</p>
              <p onClick={() => {this.handleStatus(5)}}>5</p>
            </>
            : 
            null}
          </div>
        </div>
    );
  }
}

export default withAuth(TupperDetail);