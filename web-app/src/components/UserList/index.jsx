import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import ReactTable from 'react-table';
import TableValues from './TableValues';
import ActionButton from './ActionButton';
import { ActionWrap } from './styled';
import { isEmpty } from 'lodash';

const buildActions = (holiday, actions) => {
  const actionComponents = [];

  for (const action in actions) {
    actionComponents.push(
      <ActionButton
        key={action}
        holiday={holiday}
        action={actions[action]}
        label={action}
      />
    );
  }

  return <ActionWrap>{actionComponents}</ActionWrap>;
};

const buildColumns = (columns, actions) => {
  const formattedColumns = columns.reduce((acc, column) => {
    return acc.concat(TableValues[column]);
  }, []);

  if (isEmpty(actions)) return formattedColumns;

  formattedColumns.push({
    id: 'actions',
    sortable: false,
    filterable: false,
    accessor: user => buildActions(user, actions),
  });

  return formattedColumns;
};

const renderTable = (users, columns, actions, onRowClick) => {
  const formattedColumns = buildColumns(columns, actions);
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
  const { users, columns, actions, onRowClick } = props;
  return !users || users.length === 0 ? (
    <p>There are no users to show</p>
  ) : (
    renderTable(users, columns, actions, onRowClick)
  );
};

UserList.propTypes = {
  users: PT.array,
  columns: PT.array.isRequired,
  actions: PT.object,
  onRowClick: PT.func,
};

UserList.defaultProps = {
  onRowClick: () => {},
};

export default container(UserList);
