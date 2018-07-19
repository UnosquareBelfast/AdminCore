import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { TableCSS } from './styled';

const Table = ({ tableHeaders, tableRows }) => {
  const header = tableHeaders.map((headerRow, index) => {
    return <th key={index}>{headerRow}</th>;
  });

  return (
    <TableCSS>
      <thead>
        <tr>{header}</tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </TableCSS>
  );
};

Table.propTypes = {
  tableHeaders: PT.array.isRequired,
  tableRows: PT.node.isRequired,
};

export default Table;
