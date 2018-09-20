const fullName = {
  id: 'fullName',
  Header: 'Full Name',
  accessor: user => user.members.map( element => element.name ),
};
  
const state = {
  id: 'state',
  Header: 'State',
  accessor: user => user.members.map( element => element.state ),
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
  