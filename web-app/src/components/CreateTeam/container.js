import React, { Component } from 'react';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        clients: [],
      };
    }

    updateFormState = formData => {
      this.setState({
        contractData: {
          ...this.state.contractData,
          ...formData,
        },
      });
    };

    render() {
      return <Wrapped />;
    }
  };
