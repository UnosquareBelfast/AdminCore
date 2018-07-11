import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Button } from '../../common';
import { ButtonWrap, ButtonContainer } from './styled';

export class Form extends Component {
  static propTypes = {
    submitForm: PT.func.isRequired,
    formStatus: PT.func,
    formData: PT.object,
    buttonLabel: PT.string,
    children: PT.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      elementCount: 0,
      validatedElements: [],
      formIsValid: false,
    };
  }

  componentDidMount() {
    const elementCount = React.Children.count(this.props.children);
    this.setState(
      {
        elementCount,
      },
      () => {
        this.addInputsToValidatedElements();
      },
    );
  }

  addInputsToValidatedElements = () => {
    let validatedElements = [...this.state.validatedElements];
    let keys = Object.keys(this.props.formData);
    for (let key of keys) {
      if (this.props.formData[key] !== '') {
        validatedElements.push(key);
        this.setState({ validatedElements });
      }
    }
    let formIsValid = validatedElements.length === this.state.elementCount;
    this.setState({ formIsValid });
  };

  handleCheckInputValid = (name, value, isValid) => {
    let validatedElements = [...this.state.validatedElements];
    if (isValid) {
      if (!validatedElements.includes(name)) {
        validatedElements.push(name);
      }
    } else {
      if (validatedElements.includes(name)) {
        validatedElements = validatedElements.filter(item => item !== name);
      }
    }

    let formIsValid = validatedElements.length === this.state.elementCount;
    this.setState({ validatedElements, formIsValid });

    this.props.formStatus(name, value, this.state.formIsValid);
  };

  render() {
    const childWithProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        validateForm: this.handleCheckInputValid,
      });
    });

    let buttons;
    if (this.props.buttonLabel == 'Update') {
      buttons = (
        <ButtonWrap>
          <Button
            label={this.props.buttonLabel}
            onClick={this.props.submitForm}
            disabled={!this.state.formIsValid}
          />
          <Button
            label="Cancel"
            onClick={this.props.submitForm}
            disabled={!this.state.formIsValid}
          />
        </ButtonWrap>
      );
    } else {
      buttons = (
        <ButtonContainer>
          <Button
            label={this.props.buttonLabel}
            onClick={this.props.submitForm}
            disabled={!this.state.formIsValid}
          />
        </ButtonContainer>
      );
    }

    return (
      <form>
        {childWithProp}
        {buttons}
      </form>
    );
  }
}
export default Form;
