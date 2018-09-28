const fullName = {
  id: 'fullName',
  Header: 'Full Name',
  accessor: user => {
    return user.members[0].name;
  },
};
  
const state = {
  id: 'state',
  Header: 'State',
  accessor: user => {
    return user.members[0].state;
  },
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
  
