import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import ReactTable from 'react-table';
import TableValues from './TableValues';

const buildColumns = columns => {
  const formattedColumns = columns.reduce((acc, column) => {
    return acc.concat(TableValues[column]);
  }, []);

  return formattedColumns;
};

const renderTable = (users, columns, onRowClick) => {
  const formattedColumns = buildColumns(columns);
  return (
    <ReactTable
      data={users}
      columns={formattedColumns}
      defaultPageSize={10}
      filterable
      className="-striped -highlight"
      defaultFilterMethod={(filter, row) =>
        String(row[filter.id]).includes(filter.value)
      }
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

export const UserList = props => {
  const { users, columns, onRowClick } = props;
  return !users || users.length === 0 ? (
    <p>There are no users to show</p>
  ) : (
    renderTable(users, columns, onRowClick)
  );
};

UserList.propTypes = {
  users: PT.array,
  columns: PT.array.isRequired,
  onRowClick: PT.func,
};

UserList.defaultProps = {
  onRowClick: () => {},
};

export default container(UserList);