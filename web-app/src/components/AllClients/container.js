import React, { Component } from 'react';
import { getAllClients } from '../../services/clientService';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { clients: [] };
    }

    componentDidMount() {
      this.getClients();
    }

    getClients = () => {
      getAllClients().then(response => {
        const clients = response.data;
        this.setState({ clients });
      });
    };

    render() {
      return <Wrapped {...this.props} clients={this.state.clients} />;
    }
  };
