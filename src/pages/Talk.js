import React, { Component } from 'react';
import sendLogo from '../img/send.png'
import talksService from '../lib/talks-service';

class Talk extends Component {

  state = {
    message: '',
    messages: []
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
    .then((result) => {
      console.log(result);
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
        messages: talk.messages
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    const { message } = this.state;
    const { messages } = this.state;
    return (
      <div className="talk-page">
        <div className="messages">
        {messages.map(message =>
          <p className="comment-bubble"><img src="" alt=""/><span>{message.comment}</span></p>
          )}
        </div>
        <div id="fixed-textarea">
          <form onSubmit={this.sendMessage} className="messages-form">
            <textarea onChange={this.handleChange} name="message" value={message} placeholder="Send a message..." tabindex="5" required></textarea>
            <button type="submit"><img id="send-logo" src={sendLogo} alt=""/></button>
          </form>
        </div>
      </div>
    );
  }
}

export default Talk;
