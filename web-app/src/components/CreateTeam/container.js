import React, { Component } from 'react';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <Wrapped
          step={this.state.step}
          nextStep={this.nextStep}
          submit={this.submitContract}
          contract={this.state.contractData}
        />
      );
    }
  };
