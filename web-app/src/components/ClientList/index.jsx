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

const renderTable = (clients, columns, onRowClick) => {
  const formattedColumns = buildColumns(columns);
  return (
    <ReactTable
      data={clients}
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

export const ClientList = props => {
  const { clients, columns, onRowClick } = props;
  return !clients || clients.length === 0 ? (
    <p>There are no clients to show</p>
  ) : (
    renderTable(clients, columns, onRowClick)
  );
};

ClientList.propTypes = {
  clients: PT.array,
  columns: PT.array.isRequired,
  onRowClick: PT.func,
};

ClientList.defaultProps = {
  onRowClick: () => {},
};

export default ClientList;
