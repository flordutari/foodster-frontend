import React, { Component } from 'react';

class ErrorComponent extends Component {
  render() {
    const { message } = this.props.error;
    return (
      <>
        <p id="error-message">{message}</p>
      </>
    );
  }
}

export default ErrorComponent;