import React from 'react';
import Swal from 'sweetalert2';
import { PropTypes as PT } from 'prop-types';
import { userLogin } from '../../services/userService';
import { isLoggedIn } from '../../utilities/currentUser';

import {
  getFormElementsArray,
  updateFormDataOnChange,
  isFormValidOnChange,
  getFormDataOnSubmit,
} from '../../utilities/forms';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object,
    };
    constructor(props) {
      super(props);
      this.state = {
        form: this.initialFormState(),
        formIsValid: false,
        success: null,
        error: null,
        loading: false,
      };
    }

    componentWillMount() {
      if (isLoggedIn()) this.props.history.replace('/');
    }

    initialFormState() {
      return {
        email: {
          label: 'Email:',
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Enter your email address',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          label: 'Password:',
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Enter your password',
          },
          value: '',
          validation: {
            required: true,
            minLength: 4,
          },
          valid: false,
          touched: false,
        },
        // remember: {
        //   label: 'Remember Credentials:',
        //   elementType: 'checkbox',
        //   elementConfig: {
        //     type: 'checkbox',
        //     placeholder: 'Remember Credentials',
        //   },
        //   value: true,
        //   validation: {},
        //   valid: true,
        // },
      };
    }

    handleFormChange = (event, inputIdentifier) => {
      const inputValue = event.target.value;
      const updatedForm = updateFormDataOnChange(
        this.state.form,
        inputIdentifier,
        inputValue,
      );

      let formIsValid = isFormValidOnChange(updatedForm);
      this.setState({ form: updatedForm, formIsValid: formIsValid });
    };

    handleFormSubmit = e => {
      e.preventDefault();
      const formData = getFormDataOnSubmit(this.state.form);

      userLogin(formData.email, formData.password)
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
          formElementsArray={getFormElementsArray(this.state.form)}
          formIsValid={this.state.formIsValid}
          submitForm={this.handleFormSubmit}
          formChanged={(event, id) => this.handleFormChange(event, id)}
          success={this.state.success}
          error={this.state.error}
          loading={this.state.loading}
        />
      );
    }
  };
