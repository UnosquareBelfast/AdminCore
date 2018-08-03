import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import ReactTable from 'react-table';
import TableValues from './TableValues';

class HolidayList extends Component {
  static propTypes = {
    holidays: PT.array.isRequired,
    columns: PT.array.isRequired,
    onRowClick: PT.func,
  };

  static defaultProps = {
    onRowClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      filtered: [
        {
          id: 'status',
          value: 'appro',
        },
      ],
    };
  }

  buildColumns = columns => {
    const formattedColumns = columns.reduce((acc, column) => {
      return acc.concat(TableValues[column]);
    }, []);

    return formattedColumns;
  };

  renderTable = (holidays, columns, onRowClick) => {
    const formattedColumns = this.buildColumns(columns);
    console.log(this.state.filtered);

    return (
      <ReactTable
        filterable
        filtered={this.state.filtered}
        data={holidays}
        columns={formattedColumns}
        defaultPageSize={10}
        className="-striped -highlight"
        getTrProps={(state, rowInfo) => {
          return {
            onClick: () => onRowClick(rowInfo.original),
            style: {
              cursor: rowInfo ? 'pointer' : 'null',
            },
          };
        }}
      />
    );
  };

  render() {
    const { holidays, columns, onRowClick } = this.props;

    return !holidays || holidays.length === 0 ? (
      <p>There are no holidays to show</p>
    ) : (
      this.renderTable(holidays, columns, onRowClick)
    );
  }
}

export default HolidayList;
