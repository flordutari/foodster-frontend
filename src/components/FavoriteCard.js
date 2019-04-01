import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FavoriteCard extends Component {
  render() {
    const { imageUrl, name, id, price } = this.props;
    return (
      <Link className="favorite-card" to={`/tuppers/${id}`}>
        <div>
          <img src={imageUrl} alt=""/>
        </div>
        <div className="detail-fav-card">
          <p>{name}</p>
          <p>{price}  <i className="fas fa-ticket-alt"></i></p>
        </div>
      </Link>
    );
  }
}

export default FavoriteCard;
