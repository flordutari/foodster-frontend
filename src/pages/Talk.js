import React, { Component } from 'react';
import sendLogo from '../img/send.png'
import { withAuth } from '../providers/AuthProvider';
import talksService from '../lib/talks-service';

class Talk extends Component {

  state = {
    message: '',
    messages: [],
    talk: {},
    guest: {},
    opener: {},
    creator: []
  }

  componentDidMount = () => {
    this.getTalk();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  sendMessage = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { message } = this.state;
    talksService.createMessage({message}, id)
    .then(() => {
      this.setState({
        message:'',
      })
    })
    .then(() => {this.getTalk();})
    .catch(err => console.log(err));
  }

  getTalk = () => {
    const { id } = this.props.match.params;
    talksService.getOne(id)
    .then(talk => {
      this.setState({
        guest: talk.guest,
        opener: talk.opener,
        messages: talk.messages,
        talk
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    const { message, messages, opener, guest } = this.state;
    const { _id } = this.props.user;
    return (
      <div className="talk-page">
        {(_id === opener._id) ? <h3 className="talk-header">Talk with {guest.username}</h3> : <h3>Talk with {opener.username}</h3>}
        <div className="messages">
        {messages.map(message =>{
          return((message.creator._id === _id) ?
          <div className="comment-bubble-red"><span>{message.comment}</span></div> :
          <div className="comment-bubble"><span>{message.comment}</span></div> 
          )})}
        </div>
        <div id="fixed-textarea">
          <form onSubmit={this.sendMessage} className="messages-form">
            <textarea onChange={this.handleChange} name="message" value={message} placeholder="Send a message..." tabindex="5" required></textarea>
            <button className="send-button" type="submit"><img id="send-logo" src={sendLogo} alt=""/></button>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Talk);
