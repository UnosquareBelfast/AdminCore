import React from 'react';
import { Card } from '../../../components/common';
import { SidebarHeader, SidebarList } from './styled';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <Card>
      <SidebarHeader>Employees</SidebarHeader>
      <SidebarList>
        <li>
          <Link to="./employees">View All Employees</Link>
        </li>
        <li>
          <Link to="./createEmployee">Create Employee</Link>
        </li>
      </SidebarList>
      <SidebarHeader>Holidays</SidebarHeader>
      <SidebarList>
        <li>
          <Link to="./pendingHolidays">Manage Pending Holidays</Link>
        </li>
        <li>
          <Link to="./holidays">View All Holidays</Link>
        </li>
        <li>
          <Link to="./createHoliday">Create Mandatory Holiday</Link>
        </li>
        <li>
          <Link to="./removeHoliday">Remove Mandatory Holiday</Link>
        </li>
      </SidebarList>
      <SidebarHeader>Clients</SidebarHeader>
      <SidebarList>
        <li>
          <Link to="./clients">View All Clients</Link>
        </li>
        <li>
          <Link to="./createClients">Create Client</Link>
        </li>
      </SidebarList>
      <SidebarHeader>Contracts</SidebarHeader>
      <SidebarList>
        <li>
          <Link to="./contracts">View All Contracts</Link>
        </li>
        <li>
          <Link to="./createContracts">Create Contract</Link>
        </li>
      </SidebarList>
    </Card>
  );
};

export default Sidebar;
