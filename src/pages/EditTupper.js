import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import EditForm from '../components/EditForm';

class EditTupper extends Component {

  state = {
    tupper: {},
    isLoading: true
  }

  componentDidMount() {
    this.getOneTupper();
  }
  
  getOneTupper = () => {
    const { id } = this.props.match.params;
    tupperService.getOne(id)
    .then(tupper => {
      this.setState({
        tupper,
        isLoading: false
      })
    })
    .catch(err => console.log(err));
  }

  handleSubmit = (tupper) => {
    const {id} = this.props.match.params;
    tupperService.editTupper(tupper, id)
    .then(this.props.history.push(`/tuppers/${id}`))
    .catch(err => console.log(err));
  }

  render() {
    const {isLoading} = this.state;
    return (
      (isLoading) ? <p>Loading...</p> : 
        <div className="edit-tupper">
          <h2 className="edit-form">Edit your tupper</h2>
          <EditForm onSubmit={this.handleSubmit} value={this.state.tupper}/>
        </div>
    )
  }
}

export default EditTupper;

