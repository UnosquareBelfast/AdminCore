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
        </div>
        <div>
          <h3>Holidays</h3>
          <Link to="/admin/holidays">View All Holidays</Link>
          <Link to="/admin/pendingHolidays">View Pending Holidays</Link>
        </div>
        <div>
          <h3>Clients</h3>
          <Link to="">View All Holidays</Link>
          <Link to="">View Pending Holidays</Link>
        </div>
        <div>
          <h3>Contracts</h3>
          <Link to="">View All Holidays</Link>
          <Link to="">View Pending Holidays</Link>
        </div>
      </div>
    </InnerLayout>
  );
};

export default AdminDashboard;
