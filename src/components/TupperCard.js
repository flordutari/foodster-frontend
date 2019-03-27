import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class TupperCard extends Component {
  render() {
    return (
      <Link to={`/tuppers/${this.props.tupper._id}`}>
        <h3>{this.props.tupper.name}</h3>
        <img src={this.props.tupper.imageUrl} alt="tupper" />
      </Link>
    );
  }
}

export default TupperCard;
