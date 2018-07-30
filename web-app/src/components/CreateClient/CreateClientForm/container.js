import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getClientById } from '../../../services/clientService';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      clientId: PT.number.isRequired,
      onRequestCreate: PT.func.isRequired,
      onRequestUpdate: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        formData: {
          clientName: '',
        },
        formIsValid: false,
      };
    }

    componentDidMount = () => {
      this.getClientDetails();
    };

    getClientDetails = () => {
      if (this.props.clientId > 0) {
        getClientById(this.props.clientId).then(response => {
          const formData = { ...this.state.formData, ...response.data };
          this.setState({
            formData: formData,
          });
        });
      }
    };

    handleFormStatus(name, value, formIsValid) {
      const updatedFormData = { ...this.state.formData };
      updatedFormData[name] = value;
      this.setState({
        formData: updatedFormData,
        formIsValid,
      });
    }

    handleClientCreate = event => {
      event.preventDefault();
      const formData = { ...this.state.formData };
      this.props.onRequestCreate(formData);
      this.setState({ formData: { clientName: '' } });
    };

    handleClientUpdate = event => {
      event.preventDefault();
      const formData = { ...this.state.formData };
      this.props.onRequestUpdate(formData);
    };

    render() {
      return (
        <Wrapped
          clientId={this.props.clientId}
          formData={this.state.formData}
          formIsValid={this.state.formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          submitFormCreate={e => this.handleClientCreate(e)}
          submitFormUpdate={e => this.handleClientUpdate(e)}
        />
      );
    }
  };
