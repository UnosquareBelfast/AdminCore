import React from 'react';
import Swal from 'sweetalert2';
import { PropTypes as PT } from 'prop-types';
import { userLogin } from '../../services/userService';
import { isLoggedIn } from '../../utilities/currentUser';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object,
    };
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
      };
      // this.state = {
      //   form: this.initialFormState(),
      //   formIsValid: false,
      //   loading: false,
      // };
    }

    componentWillMount() {
      if (isLoggedIn()) this.props.history.replace('/');
    }

    // initialFormState() {
    //   return {
    //     email: {
    //       label: 'Email:',
    //       elementType: 'input',
    //       elementConfig: {
    //         type: 'email',
    //         placeholder: 'Enter your email address',
    //       },
    //       value: '',
    //       validation: {
    //         required: true,
    //         isEmail: true,
    //       },
    //       valid: false,
    //       touched: false,
    //     },
    //     password: {
    //       label: 'Password:',
    //       elementType: 'input',
    //       elementConfig: {
    //         type: 'password',
    //         placeholder: 'Enter your password',
    //       },
    //       value: '',
    //       validation: {
    //         required: true,
    //         minLength: 4,
    //       },
    //       valid: false,
    //       touched: false,
    //     },
    //   };
    // }

    // handleFormChange = (event, inputIdentifier) => {
    //   const inputValue = event.target.value;
    //   const updatedForm = updateFormDataOnChange(
    //     this.state.form,
    //     inputIdentifier,
    //     inputValue,
    //   );

    //   let formIsValid = isFormValidOnChange(updatedForm);
    //   this.setState({ form: updatedForm, formIsValid: formIsValid });
    // };

    handleFormSubmit = e => {
      e.preventDefault();
      console.log('e :', e);
      //const formData = getFormDataOnSubmit(this.state.form);

      // userLogin(formData.email, formData.password)
      //   .then(() => {
      //     this.props.history.push('/');
      //   })
      //   .catch(error => {
      //     Swal({
      //       title: 'Could not log in',
      //       text: error.message,
      //       type: 'error',
      //     });
      //   });
    };

    render() {
      return (
        <Wrapped
          formIsValid={this.state.formIsValid}
          submitForm={this.handleFormSubmit}
          formChanged={(event, id) => this.handleFormChange(event, id)}
          loading={this.state.loading}
        />
      );
    }
  };
