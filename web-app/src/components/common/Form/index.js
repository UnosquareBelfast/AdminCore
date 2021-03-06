import React, { Component, Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Button } from '../../common';
import { ButtonContainer } from './styled';

export class Form extends Component {
  static propTypes = {
    formStatus: PT.func,
    formData: PT.object,
    actions: PT.array,
    children: PT.oneOfType([PT.array, PT.object]).isRequired,
  };

  static defaultProps = {
    actions: [],
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
    const { formData } = this.props;
    let keys = Object.keys(formData);
    for (let key of keys) {
      if (formData[key] !== '' || (key === 'updateMessage' || key === 'employeeRejectionMessage') ) {
        validatedElements.push(key);
      }
    }
    let formIsValid = validatedElements.length === this.state.elementCount;
    this.setState({ validatedElements, formIsValid });
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
    this.setState({ validatedElements, formIsValid }, () => {
      this.props.formStatus(name, value, this.state.formIsValid);
    });
  };

  render() {
    const childWithProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        validateForm: this.handleCheckInputValid,
      });
    });

    return (
      <form>
        {childWithProp}
        <ButtonContainer>
          {this.props.actions.map((action, index) => {
            return (
              <Fragment key={index}>
                <Button
                  label={action.label}
                  onClick={action.event}
                  disabled={action.disabled}
                />
              </Fragment>
            );
          })}
        </ButtonContainer>
      </form>
    );
  }
}
export default Form;
