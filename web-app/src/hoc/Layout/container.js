import React, { Component } from 'react';
import {
  faUser,
  faTachometerAlt,
  faUnlockAlt,
} from '@fortawesome/fontawesome-free-solid';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        menuItems: [
          {
            name: 'Profile',
            tooltip: 'Go to profile',
            route: '/profile',
            icon: faUser,
            subnav: null,
          },
          {
            name: 'Dashboard',
            tooltip: 'Go to admin',
            route: '/',
            icon: faTachometerAlt,
            subnav: null,
          },
          {
            name: 'Admin',
            tooltip: 'Go to admin',
            route: '/admin',
            icon: faUnlockAlt,
            subnav: [
              {
                name: 'Employees',
                route: '/admin/employees',
              },
              {
                name: 'Holidays',
                route: '/admin/holidays',
              },
              {
                name: 'Pending Holidays',
                route: '/admin/pendingHolidays',
              },
              {
                name: 'Clients',
                route: '/admin/clients',
              },
              {
                name: 'Contract',
                route: '/admin/contracts',
              },
            ],
          },
        ],
      };
    }

    render() {
      return <Wrapped {...this.props} {...this.state} />;
    }
  };
