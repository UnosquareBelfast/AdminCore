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

export default {
  fullName,
  email,
};
