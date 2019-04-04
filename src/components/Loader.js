import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <div className="col-sm-6 text-center"><p>loader 1</p><div className="loader1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div></div>
      </div>
    );
  }
}

export default Loader;