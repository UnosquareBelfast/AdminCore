import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';

export class Form extends Component {
  static propTypes = {
    submitForm: PT.func.isRequired,
    children: PT.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      invalidInputs: [],
      formIsValid: true,
    };
  }

  handleCheckInputValid = (label, isValid) => {
    let invalidInputs = [...this.state.invalidInputs];
    if (isValid) {
      if (invalidInputs.includes(label)) {
        let index = invalidInputs.indexOf(label);
        invalidInputs = invalidInputs.splice(index, 1);
      }
    } else {
      if (!invalidInputs.includes(label)) {
        invalidInputs.push(label);
      }
    }
    let formIsValid = invalidInputs.length > 0 ? false : true;
    this.setState({ formIsValid, invalidInputs });
  };

  render() {
    const childWithProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        validateForm: this.handleCheckInputValid,
      });
    });

    return (
      <form id="loginForm" onSubmit={this.props.submitForm}>
        {childWithProp} {/* instead of this.props.children */}
        <button type="submit" disabled={this.formIsValid}>
          Login
        </button>
      </form>
    );
  }
}
export default Form;
