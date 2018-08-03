import React from 'react';
import { PropTypes as PT } from 'prop-types';
import ReactTable from 'react-table';
import TableValues from './TableValues';

const buildColumns = columns => {
  const formattedColumns = columns.reduce((acc, column) => {
    return acc.concat(TableValues[column]);
  }, []);

  return formattedColumns;
};

const renderTable = (clients, columns, onRowClick, pageSize) => {
  const formattedColumns = buildColumns(columns);
  return (
    <ReactTable
      filterable
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

export const ClientList = props => {
  const { clients, columns, onRowClick, pageSize } = props;
  return !clients || clients.length === 0 ? (
    <p>There are no clients to show</p>
  ) : (
    renderTable(clients, columns, onRowClick, pageSize)
  );
};

ClientList.propTypes = {
  clients: PT.array,
  columns: PT.array.isRequired,
  onRowClick: PT.func,
  pageSize: PT.number,
};

ClientList.defaultProps = {
  onRowClick: () => {},
  pageSize: 10,
};

export default ClientList;
