import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import ReactTable from 'react-table';
import TableValues  from './TableValues';
import ActionButton from './ActionButton';
import { theme } from '../../styled';
import { ActionWrap } from './styled';
import moment from 'moment';
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
        color={action === 'reject' ? theme.colours.red : null}
        hoverColor={action === 'reject' ? theme.colours.darkRed : null}
      />
    );
  }

  return <ActionWrap>{actionComponents}</ActionWrap>;
};


const buildColumns = (columns, actions) => {
  const formattedColumns =  columns.reduce((acc, column) => {
    return acc.concat(TableValues[column]);
  }, []);

  if (isEmpty(actions)) return formattedColumns;

  formattedColumns.push({
    id: 'actions',
    sortable: false,
    filterable: false,
    'accessor': holiday => buildActions(holiday, actions),
  });

  return formattedColumns;
};


const renderTable = (holidays, columns, actions) => {
  const formattedColumns = buildColumns(columns, actions);
  return (
    <ReactTable
      data={holidays}
      columns={formattedColumns}
      defaultPageSize={10}
      filterable
      defaultFilterMethod={(filter, row) =>
        String(row[filter.id]).includes(filter.value)}
      defaultSortMethod={(a, b) => {
        const aMoment = new moment(`${a} 00:00:00 GMT`);
        const bMoment = new moment(`${b} 00:00:00 GMT`);
        return aMoment.isBefore(bMoment) ? 1 : -1;
      }}
    />
  );
};


export const HolidayList = (props) => {
  const {holidays, columns, actions} = props;
  return (
    !holidays || holidays.length === 0
      ? <p>There are no holidays to show</p>
      : renderTable(holidays, columns, actions)
  );
};

HolidayList.propTypes = {
  holidays: PT.array,
  columns: PT.array.isRequired,
  actions: PT.object,
};

export default container(HolidayList);
