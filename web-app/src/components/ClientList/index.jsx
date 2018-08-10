import React, { Component, Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Filter } from '../common';
import ReactTable from 'react-table';
import TableValues from './TableValues';

class ClientList extends Component {
  static propTypes = {
    clients: PT.array.isRequired,
    columns: PT.array.isRequired,
    onRowClick: PT.func,
    pageSize: PT.number,
  };

  static defaultProps = {
    onRowClick: () => {},
    pageSize: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: { value: '', key: '' },
    };
  }

  buildColumns = columns => {
    const formattedColumns = columns.reduce((acc, column) => {
      return acc.concat(TableValues[column]);
    }, []);

    return formattedColumns;
  };

  renderTable = (clients, formattedColumns, onRowClick, pageSize) => {
    return (
      <ReactTable
        filtered={[
          { id: this.state.filter.key, value: this.state.filter.value },
        ]}
        data={clients}
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
    const { clients, columns, onRowClick, pageSize } = this.props;
    const formattedColumns = this.buildColumns(columns);

    const labels = formattedColumns.reduce((acc, column) => {
      acc.push(column.Header);
      return acc;
    }, []);

    if (clients.length > 0) {
      return (
        <Fragment>
          <Filter
            columns={columns}
            labels={labels}
            onChange={filter => this.setState({ filter })}
          />
          {this.renderTable(clients, formattedColumns, onRowClick, pageSize)}
        </Fragment>
      );
    } else {
      return <p>There are no clients to show</p>;
    }
  }
}

export default ClientList;
