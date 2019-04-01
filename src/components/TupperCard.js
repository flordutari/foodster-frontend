import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Rate from '../components/Rate';
import profileService from '../lib/profile-service';

class TupperCard extends Component {

  state ={
    tupperCreator: {},
    isLoading: true
  }

  componentDidMount = () => {
    this.getTupperCreator();
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

  render() {
    const { tupper: {name, _id, imageUrl, price, creator} } = this.props;
    const image = this.state.tupperCreator.imageUrl;
    return (
      <Link className="tupper-card" to={`/tuppers/${_id}`}>
        {/* <button className="icon-button fav-card"><i className="far fa-heart"></i></button>  */}
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
    );
  }
}

export default TupperCard;
