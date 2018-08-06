import React, { Component, Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Filter } from '../common';
import ReactTable from 'react-table';
import TableValues from './TableValues';

class TeamList extends Component {
  static propTypes = {
    teams: PT.array.isRequired,
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

  renderTable = (teams, formattedColumns, onRowClick, pageSize) => {
    return (
      <ReactTable
        filtered={[
          { id: this.state.filter.key, value: this.state.filter.value },
        ]}
        data={teams}
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
    const { teams, columns, onRowClick, pageSize } = this.props;
    const formattedColumns = this.buildColumns(columns);

    const labels = formattedColumns.reduce((acc, column) => {
      acc.push(column.Header);
      return acc;
    }, []);

    return !teams || teams.length === 0 ? (
      <p>There are no teams to show</p>
    ) : (
      <Fragment>
        <Filter
          columns={columns}
          labels={labels}
          onChange={filter => this.setState({ filter })}
        />
        {this.renderTable(teams, formattedColumns, onRowClick, pageSize)}
      </Fragment>
    );
  }
}

export default TeamList;
