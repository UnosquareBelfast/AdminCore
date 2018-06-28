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
          <Link to="./employees">View All</Link>
        </li>
        <li>
          <Link to="./createEmployee">Create</Link>
        </li>
      </SidebarList>
      <SidebarHeader>Holidays</SidebarHeader>
      <SidebarList>
        <li>
          <Link to="./pendingHolidays">Manage Pending</Link>
        </li>
        <li>
          <Link to="./holidays">View All</Link>
        </li>
        <li>
          <Link to="./createHoliday">Create Mandatory</Link>
        </li>
        <li>
          <Link to="./removeHoliday">Remove Mandatory</Link>
        </li>
      </SidebarList>
      <SidebarHeader>Clients</SidebarHeader>
      <SidebarList>
        <li>
          <Link to="./clients">View All</Link>
        </li>
        <li>
          <Link to="./createClients">Create</Link>
        </li>
      </SidebarList>
      <SidebarHeader>Contracts</SidebarHeader>
      <SidebarList>
        <li>
          <Link to="./contracts">View All</Link>
        </li>
        <li>
          <Link to="./createContracts">Create</Link>
        </li>
      </SidebarList>
    </Card>
  );
};

export default Sidebar;
