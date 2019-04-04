import React, { Component } from 'react';
import CreateForm from '../components/CreateForm';
import tupperService from '../lib/tupper-service';
import ErrorComponent from '../components/ErrorComponent'

class NewTupper extends Component {

  state = {
    error: {}
  }

  handleSubmit = async (data) => {
    try {
      await tupperService.createTupper(data)
      this.props.history.push('/profile')
    } catch (error) {
      this.setState({
        error
      })
    }
    
  }

  render() {
    const { error } = this.state;
    console.log(error.message)
    return (
      <div className="new-tupper">
        <h2 className="create-form">Create new tupper</h2>
        <CreateForm onSubmit={this.handleSubmit}/>
        {(error)? 
        <ErrorComponent 
        error={error}
        /> : 
        null }
      </div>
    );
  }
}

export default NewTupper;
