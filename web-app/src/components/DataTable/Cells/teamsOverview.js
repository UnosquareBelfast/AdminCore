const fullName = {
  id: 'fullName',
  Header: 'Full Name',
  accessor: user => user.name,
};
  
const state = {
  id: 'state',
  Header: 'State',
  accessor: user => user.state,
};
  
const team = {
  id: 'team',
  Header: 'Team',
  accessor: user => user.team,
};
  
  
export default {
  fullName,
  state,
  team,
};
  
