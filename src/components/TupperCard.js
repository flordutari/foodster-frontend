import React, { Component } from 'react';

class TupperCard extends Component {
  render() {
    console.log(this.props)
    return (
      <>
        <h3>{this.props.tupper.name}</h3>
        <img src={this.props.tupper.imageUrl} alt="tupper" />
      </>
    );
  }
}

export default TupperCard;
