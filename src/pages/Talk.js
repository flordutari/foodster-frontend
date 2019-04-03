import React, { Component } from 'react';
import sendLogo from '../img/send.png'

class Talk extends Component {

  

  render() {
    return (
      <div className="talk-page">
        <div id="fixed-textarea">
          <textarea name="comment" placeholder="Write your text here..." tabindex="5" required></textarea>
          <img onClick={this.handleMessages} id="send-logo" src={sendLogo} alt=""/>
        </div>
      </div>
    );
  }
}

export default Talk;
