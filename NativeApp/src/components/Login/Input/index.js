import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { FormInput } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import { UNOBLUE, BLACK, RED, GREY } from '../../../styles/colors';
import { FORM_INPUT_TEXT } from '../../../styles/text';

class Input extends Component {
  static propTypes = {
    value: PT.node.isRequired,
    textInputRef: PT.func,
    onChangeText: PT.func.isRequired,
    returnKeyType: PT.string.isRequired,
    onBlur: PT.func,
    onFocus: PT.func,
    hasError: PT.bool,
    onSubmitEditing: PT.func.isRequired,
    blurOnSubmit: PT.bool,
    secureTextEntry: PT.bool,
  };

  static defaultProps = {
    onFocus: () => {},
    onBlur: () => {},
  }

  state = {
    isFocused: false,
  };

  onFocus = (e) => {
    const { onFocus } = this.props;

    this.setState({
      isFocused: true,
    });

    onFocus(e);
  }

  onBlur = (e) => {
    const { onBlur } = this.props;

    this.setState({
      isFocused: false,
    });

    onBlur(e);
  }

  render() {
    const {
      value,
      textInputRef,
      onChangeText,
      returnKeyType,
      hasError,
      onSubmitEditing,
      blurOnSubmit,
      secureTextEntry,
    } = this.props;

    const {
      onFocus,
      onBlur,
    } = this;

    const { isFocused } = this.state;

    return (
      <FormInput
        textInputRef={textInputRef}
        onChangeText={onChangeText}
        inputStyle={[
          styles.formInputStyles,
          isFocused && styles.isFocused,
          hasError && styles.hasError,
        ]}
        underlineColorAndroid="transparent"
        selectionColor={UNOBLUE}
        autoCapitalize="none"
        value={value}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
      />
    );
  }
}

const styles = StyleSheet.create({
  formInputStyles: {
    fontSize: FORM_INPUT_TEXT,
    color: BLACK,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: GREY,
    width: '100%',
  },
  isFocused: {
    borderColor: UNOBLUE,
  },
  hasError: {
    borderColor: RED,
  },
});

export default Input;
