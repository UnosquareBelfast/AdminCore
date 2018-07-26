import React from 'react';
import { Link } from 'react-router-dom';
import { InnerLayout } from './styled';

const AdminDashboard = () => {
  return (
    <InnerLayout>
      <h2>Admin Dashboard</h2>
      <div className="columnWrap">
        <div>
          <h3>Employees</h3>
          <Link to="/admin/employees">View Employees</Link>
          <Link to="/admin/employees/new">Create Employee</Link>
        </div>
        <div>
          <h3>Holidays</h3>
          <Link to="/admin/holidays">View All Holidays</Link>
          <Link to="/admin/holidays/pending">View Pending Holidays</Link>
        </div>
      </div>
      <div className="columnWrap">
        <div>
          <h3>Clients</h3>
          <Link to="/admin/clients">View All Clients</Link>
          <Link to="/admin/clients/new">Create Client</Link>
        </div>
        <div>
          <h3>Teams</h3>
          <Link to="/admin/teams">View All Teams</Link>
          <Link to="/admin/teams/new">Create Team</Link>
        </div>
        <div>
          <h3>Contracts</h3>
          <Link to="/admin/contracts">View Contracts</Link>
          <Link to="/admin/contracts/new">Create Contract</Link>
        </div>
      </div>
    </InnerLayout>
  );
};

export default AdminDashboard;
