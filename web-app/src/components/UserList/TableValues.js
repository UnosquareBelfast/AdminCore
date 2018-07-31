const fullName = {
  id: 'fullName',
  Header: 'Full Name',
  accessor: user => `${user.forename} ${user.surname}`,
};

const email = {
  id: 'email',
  Header: 'Email',
  accessor: user => user.email,
};

const location = {
  id: 'location',
  Header: 'Location',
  accessor: user => user.country.description,
};

const role = {
  id: 'role',
  Header: 'Role',
  accessor: user => user.employeeRole.description,
};

export default {
  fullName,
  email,
  location,
  role,
};
