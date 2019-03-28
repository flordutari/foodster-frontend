import React, { Component } from 'react';
import CreateForm from '../components/CreateForm';
import tupperService from '../lib/tupper-service';

class NewTupper extends Component {

  handleSubmit = (data) => {
    console.log(data)
    tupperService.createTupper(data)
      .then((result) => {
        console.log(result);
        this.props.history.push('/tuppers');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <CreateForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default NewTupper;
