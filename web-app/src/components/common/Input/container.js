import React from 'react';
import { PropTypes as PT } from 'prop-types';
import checkValidity from '../../../utilities/inputValidationRules';

export default Wrapped =>
  class extends React.PureComponent {
    static propTypes = {
      label: PT.string.isRequired,
      type: PT.string.isRequired,
      htmlAttrs: PT.object.isRequired,
      value: PT.any.isRequired,
      validateForm: PT.func,
      focus: PT.bool,
      rules: PT.object,
    };

    static defaultProps = {
      focus: false,
      rules: null,
      validateForm: () => {},
    };

    constructor(props) {
      super(props);
      this.state = {
        valid: this.setDefaultValidation(),
        touched: this.setDefaultValidation(),
      };
    }

    setDefaultValidation() {
      if (this.props.type == 'select' || this.props.type == 'checkbox') {
        return true;
      } else {
        return false;
      }
    }

    handleInputChange = event => {
      let value;
      if (this.props.type == 'checkbox') {
        value = event.target.checked;
      } else if (this.props.type == 'date') {
        value = event;
      } else {
        value = event.target.value;
      }

      this.setState(
        {
          touched: true,
        },
        () => {
          this.handleValidation(value);
        },
      );
    };

    handleValidation = value => {
      const { rules, validateForm, htmlAttrs } = this.props;
      const valid = rules ? checkValidity(value, rules) : true;
      this.setState(
        {
          valid,
        },
        () => {
          validateForm(htmlAttrs.name, value, valid);
        },
      );
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          changed={event => this.handleInputChange(event)}
        />
      );
    }
  };
