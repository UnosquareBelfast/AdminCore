import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';

class Filter extends Component {
  static propTypes = {
    columns: PT.array.isRequired,
    labels: PT.array.isRequired,
    onChange: PT.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      key: '',
    };
  }

  handleChange = event => {
    const { value } = event.target;
    const { onChange } = this.props;
    const { key } = this.state;

    this.setState({ value }, () => {
      onChange({ key, value });
    });
  };

  constructOptions = () => {
    const { columns, labels } = this.props;
    return columns.reduce((acc, column, index) => {
      acc.push({
        value: column,
        label: labels[index],
      });
      return acc;
    }, []);
  };

  switchKey = event => {
    const { value } = event.target;
    this.setState({ key: value });
  };

  render() {
    const options = this.constructOptions();

    return (
      <div>
        <label>
          Filter:
          <select value={this.state.key} onChange={this.switchKey}>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
      </div>
    );
  }
}

export default Filter;
