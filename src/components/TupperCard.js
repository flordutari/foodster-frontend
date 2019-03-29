import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class TupperCard extends Component {
  render() {
    const { tupper: {name, _id, imageUrl, price}, onDelete } = this.props;
    return (
      <Link to={`/tuppers/${_id}`}>
        <h3>{name}</h3>
        <img src={imageUrl} alt="tupper" />
        <input type="hidden" onClick={() => onDelete(_id)} />
        <p>{price}</p>
      </Link>
    );
  }
}

export default TupperCard;
