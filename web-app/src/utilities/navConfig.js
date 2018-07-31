import {
  faSmile,
  faCalendarAlt,
  faUnlockAlt,
  faUsers,
} from '@fortawesome/fontawesome-free-solid';

export default [
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
];

export const adminItems = [
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
        route: '/admin/holidays/pending',
      },
      {
        name: 'Clients',
        route: '/admin/clients',
      },
      {
        name: 'Teams',
        route: '/admin/teams',
      },
      {
        name: 'Contracts',
        route: '/admin/contracts',
      },
    ],
  },
];
