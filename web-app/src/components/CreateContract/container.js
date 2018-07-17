import React, { Component } from 'react';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        contractData: {},
        step: 0,
      };
    }

    nextStep = formData =>
      this.setState({
        step: this.state.step + 1,
        contractData: {
          ...this.state.contractData,
          ...formData,
        },
      });

    render() {
      return <Wrapped step={this.state.step} nextStep={this.nextStep} />;
    }
  };
