import React from 'react';
import Swal from 'sweetalert2';
import { PropTypes as PT } from 'prop-types';
import { userLogin } from '../../services/userService';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object.isRequired,
    };
    constructor(props) {
      super(props);
      this.state = {
        formData: {
          email: '',
          password: '',
        },
        formIsValid: false,
      };
    }

    handleFormStatus(name, value, formIsValid) {
      const updatedFormData = { ...this.state.formData };
      updatedFormData[name] = value;
      this.setState({
        formData: updatedFormData,
        formIsValid,
      });
    }

    handleFormSubmit = event => {
      event.preventDefault();
      const { email, password } = this.state.formData;
      userLogin(email, password)
        .then(() => {
          this.props.history.push('/');
        })
        .catch(error => {
          Swal({
            title: 'Could not log in',
            text: error.message,
            type: 'error',
          });
        });
    };

    render() {
      return (
        <Wrapped
          formData={this.state.formData}
          formIsValid={this.state.formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          submitForm={e => this.handleFormSubmit(e)}
        />
      );
    }
  };
