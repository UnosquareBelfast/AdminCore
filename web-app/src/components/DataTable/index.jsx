import React, { Component, Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Filter } from '../common';
import ReactTable from 'react-table';

class DataTable extends Component {
  static propTypes = {
    data: PT.array.isRequired,
    columns: PT.array.isRequired,
    cells: PT.object.isRequired,
    onRowClick: PT.func,
    pageSize: PT.number,
    emptyMessage: PT.string,
  };

  static defaultProps = {
    onRowClick: () => {},
    pageSize: 10,
    emptyMessage: 'No data found',
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: { value: '', key: '' },
    };
  }

  buildColumns = columns => {
    const { cells } = this.props;
    const formattedColumns = columns.reduce((acc, column) => {
      return acc.concat(cells[column]);
    }, []);

    return formattedColumns;
  };

  renderTable = formattedColumns => {
    const { data, pageSize, onRowClick } = this.props;
    return (
      <ReactTable
        filtered={[
          { id: this.state.filter.key, value: this.state.filter.value },
        ]}
        data={data}
        columns={formattedColumns}
        defaultPageSize={pageSize}
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
    const { data, columns, emptyMessage } = this.props;
    const formattedColumns = this.buildColumns(columns);

    const labels = formattedColumns.reduce((acc, column) => {
      acc.push(column.Header);
      return acc;
    }, []);

    if (data.length > 0) {
      return (
        <Fragment>
          <Filter
            columns={columns}
            labels={labels}
            onChange={filter => this.setState({ filter })}
          />
          {this.renderTable(formattedColumns)}
        </Fragment>
      );
    } else {
      return <p>{emptyMessage}</p>;
    }
  }
}

export default DataTable;
