import React, { Component } from 'react';
import CreateForm from '../components/CreateForm';
import tupperService from '../lib/tupper-service';

class NewTupper extends Component {

  handleSubmit = (data) => {
    tupperService.createTupper(data)
      .then((result) => {
        console.log(result);
        this.props.history.push('/profile');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="new-tupper">
        <h2 className="create-form">Create new tupper</h2>
        <CreateForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default NewTupper;
