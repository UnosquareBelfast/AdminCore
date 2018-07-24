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

const renderTable = (teams, columns, onRowClick) => {
  const formattedColumns = buildColumns(columns);
  return (
    <ReactTable
      data={teams}
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

export const TeamList = props => {
  const { teams, columns, onRowClick } = props;
  return !teams || teams.length === 0 ? (
    <p>There are no teams to show</p>
  ) : (
    renderTable(teams, columns, onRowClick)
  );
};

TeamList.propTypes = {
  teams: PT.array,
  columns: PT.array.isRequired,
  onRowClick: PT.func,
};

TeamList.defaultProps = {
  onRowClick: () => {},
};

export default TeamList;
