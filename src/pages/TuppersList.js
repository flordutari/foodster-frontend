import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import TupperCard from '../components/TupperCard';

class TuppersList extends Component {

  state={
    tuppers: []
  }

  componentDidMount() {
    this.getTupperList();
  }
  
  getTupperList = () => {
    tupperService.getAll()
      .then(tuppers => {
        this.setState({
          tuppers
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const {tuppers} = this.state;
    return (
      <ul>
        {tuppers.map((tupper) => (
          (tupper.available) ?
          <TupperCard
            key={tupper._id}
            tupper={tupper}
          /> :
          null
        ))}
      </ul>
    );
  }
}

export default TuppersList;

