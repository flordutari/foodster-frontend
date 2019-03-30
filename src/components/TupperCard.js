import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class TupperCard extends Component {
  render() {
    const { tupper: {name, _id, imageUrl, price} } = this.props;
    return (
      <Link className="tupper-card" to={`/tuppers/${_id}`}>
        <button className="icon-button fav-card"><i className="far fa-heart"></i></button> 
        <img src={imageUrl} alt="tupper" />
        <div className="tupper-card-subtitle">
          <h3>{name}</h3>
          <p>{price}  <i className="fas fa-ticket-alt"></i></p>
        </div>
      </Link>
    );
  }
}

export default TupperCard;
