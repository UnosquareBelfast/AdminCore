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

    componentWillMount() {
      if (isLoggedIn()) this.props.history.replace('/');
    }

    handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    handleSubmit = e => {
      e.preventDefault();
      userLogin(this.state.email, this.state.password)
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
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  };
