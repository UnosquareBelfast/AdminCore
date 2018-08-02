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

const renderTable = (holidays, columns, onRowClick, pageSize) => {
  const formattedColumns = buildColumns(columns);
  return (
    <ReactTable
      filterable
      data={holidays}
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
      defaultSorted={[
        {
          id: 'startDate',
          desc: true,
        },
      ]}
    />
  );
};

export const HolidayList = props => {
  const { holidays, columns, onRowClick, pageSize } = props;
  return !holidays || holidays.length === 0 ? (
    <p>There are no holidays to show</p>
  ) : (
    renderTable(holidays, columns, onRowClick, pageSize)
  );
};

HolidayList.propTypes = {
  holidays: PT.array.isRequired,
  columns: PT.array.isRequired,
  onRowClick: PT.func,
  pageSize: PT.number,
};

HolidayList.defaultProps = {
  onRowClick: () => {},
  pageSize: 10,
};

export default HolidayList;
