import React from 'react';
import { PropTypes as PT } from 'prop-types';
import checkValidity from '../../../utilities/inputValidationRules';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      label: PT.string.isRequired,
      type: PT.string.isRequired,
      htmlAttr: PT.object.isRequired,
      focus: PT.bool,
      rules: PT.object.isRequired,
      validateForm: PT.func.IsRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        value: '',
        valid: false,
        touched: false,
      };
    }

    componentDidMount() {
      this.handleValidation(this.state.value);
    }

    handleInputChange = event => {
      const value = event.target.value;
      this.setState(
        {
          value,
          touched: true,
        },
        this.handleValidation(value),
      );
    };

    handleValidation = value => {
      if (!this.props.rules) return true;
      const valid = checkValidity(value, this.props.rules);
      this.setState(
        {
          valid,
        },
        this.props.validateForm(this.props.label, valid),
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
