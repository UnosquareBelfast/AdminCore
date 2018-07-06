import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';

export class Form extends Component {
  static propTypes = {
    submitForm: PT.func.isRequired,
    children: PT.array.isRequired,
    isValid: PT.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      invalidInputs: [],
      formIsValid: true,
    };
  }

  componentDidUpdate() {
    if (this.props.isValid) {
      this.props.isValid(this.state.formIsValid);
    }
  }

  handleCheckInputValid = (label, isValid) => {
    let invalidInputs = [...this.state.invalidInputs];
    if (isValid) {
      if (invalidInputs.includes(label)) {
        invalidInputs = invalidInputs.filter(item => item !== label);
      }
    } else {
      if (!invalidInputs.includes(label)) {
        invalidInputs.push(label);
      }
    }
    let formIsValid = invalidInputs.length === 0;
    this.setState({ invalidInputs, formIsValid });
  };

  render() {
    const childWithProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        validateForm: this.handleCheckInputValid,
      });
    });

    return (
      <form id="loginForm" onSubmit={this.props.submitForm}>
        {childWithProp}
        <button type="submit" disabled={!this.state.formIsValid}>
          Login
        </button>
      </form>
    );
  }
}
export default Form;
