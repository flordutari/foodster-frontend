import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import TupperCard from '../components/TupperCard'

class TuppersList extends Component {

  state={
    tuppers: []
  }

  componentDidMount() {
    this.getTupperList();
  }
  
  getTupperList = () => {
    tupperService.getAll()
      .then(data => {
        this.setState({
          data
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const {tuppers} = this.state;
    return (
      <div>
        <ul>
          {tuppers.map(tortilla => (
            <TupperCard
              key={tortilla._id}
              data={tortilla}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TuppersList;

