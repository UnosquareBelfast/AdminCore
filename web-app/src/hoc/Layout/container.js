import React, { Component } from 'react';
import {
  faSmile,
  faCalendarAlt,
  faUnlockAlt,
  faUsers,
} from '@fortawesome/fontawesome-free-solid';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        drawerOpen: localStorage.getItem('navDrawerOpen') == 'true',
        menuItems: [
          {
            name: 'Profile',
            tooltip: 'Go to profile',
            route: '/profile',
            icon: faSmile,
            subnav: null,
          },
          {
            name: 'Dashboard',
            tooltip: 'Go to dashboard',
            route: '/',
            icon: faCalendarAlt,
            subnav: null,
          },
          {
            name: 'My Team',
            tooltip: 'Manage your team',
            route: '/team',
            icon: faUsers,
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

    toggleDrawer = () => {
      this.setState({ drawerOpen: !this.state.drawerOpen }, () => {
        localStorage.setItem('navDrawerOpen', this.state.drawerOpen);
      });
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          toggleDrawer={this.toggleDrawer}
        />
      );
    }
  };
