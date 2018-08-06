import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { FilterContainer } from './styled';

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

    this.options = [];
  }

  componentWillMount() {
    this.options = this.constructOptions();
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
    const options = columns.reduce((acc, column, index) => {
      acc.push({
        value: column,
        label: labels[index],
      });
      return acc;
    }, []);
    this.setState({ key: options[0].value });
    return options;
  };

  switchKey = event => {
    const { value } = event.target;
    this.setState({ key: value, value: '' });
  };

  render() {
    return (
      <FilterContainer>
        <label>Search</label>
        <select value={this.state.key} onChange={this.switchKey}>
          {this.options.map(option => (
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
      </FilterContainer>
    );
  }
}

export default Filter;
