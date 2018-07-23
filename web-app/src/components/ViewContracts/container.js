import React, { Component } from 'react';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        contracts: [],
      };
    }

    updateContracts = contracts => {
      this.setState({ contracts });
    };

    render() {
      return (
        <Wrapped
          contracts={this.state.contracts}
          updateContracts={this.updateContracts}
        />
      );
    }
  };
