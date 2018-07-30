import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { clickAmount: 0 };
  }

  // This feature lets you specify an array of labels which will be displayed
  // to the user before firing the button's action at the final label. Useful
  // for minimal "are you sure?" messages.
  multiClick = () => {
    if (this.state.clickAmount >= this.props.label.length - 1) {
      this.props.onClick();
      this.setState({ clickAmount: 0 });
    } else {
      this.setState({ clickAmount: this.state.clickAmount + 1 });
    }
  };

  render() {
    const { label } = this.props;
    const { clickAmount } = this.state;
    if (typeof label === 'string') {
      return <Container {...this.props}>{label}</Container>;
    } else if (Array.isArray(label)) {
      return (
        <Container {...this.props} onClick={this.multiClick}>
          {this.props.label[clickAmount]}
        </Container>
      );
    } else {
      return 'Specify a label for this button';
    }
  }
}

Button.propTypes = {
  label: PT.oneOfType([PT.string, PT.array]).isRequired,
  onClick: PT.func.isRequired,
};

export default Button;
