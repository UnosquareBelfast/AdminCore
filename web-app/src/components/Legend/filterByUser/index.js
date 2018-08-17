import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Form, Input } from '../../common';

const FilterByUser = ({ selectedEmployee, formStatus, employeeList }) => {
  if (employeeList.length > 0) {
    employeeList = employeeList.map(employee => {
      let { employeeId, forename, surname } = employee;
      return {
        value: employeeId,
        displayValue: `${forename} ${surname}`,
      };
    });

    employeeList.unshift({
      value: -1,
      displayValue: 'All',
    });
  }

  return (
    <Form formData={selectedEmployee} formStatus={formStatus}>
      <Input
        type="select"
        htmlAttrs={{
          name: 'employee',
          options: employeeList,
        }}
        value={selectedEmployee.employeeId}
        label="FILTER BY EMPLOYEE:"
      />
    </Form>
  );
};

FilterByUser.propTypes = {
  selectedEmployee: PT.object.isRequired,
  formStatus: PT.func.isRequired,
  employeeList: PT.array.isRequired,
};

export default FilterByUser;
