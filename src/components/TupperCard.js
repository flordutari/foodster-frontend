import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class TupperCard extends Component {
  render() {
    const { tupper: {name, _id, imageUrl, price} } = this.props;
    return (
      <Link className="tupper-card" to={`/tuppers/${_id}`}>
        <button className="icon-button fav-card"><i className="far fa-heart"></i></button> 
        <img src={imageUrl} alt="tupper" />
        <h3>{name}</h3>
        <div>
          <p className="distance">0.3 km - </p>
          <p>{price}  <i className="fas fa-ticket-alt"></i></p>
        </div>
        <div className="valoration">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      </Link>
    );
  }
}

export default TupperCard;
