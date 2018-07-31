import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../../reducers';
import roles from '../../utilities/roles';
import menuItems, { adminItems } from '../../utilities/navConfig';

const NavContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      userDetails: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        drawerOpen: localStorage.getItem('navDrawerOpen') == 'true',
        menuItems,
      };
    }

    componentWillUpdate(nextProps) {
      const currentRole = this.props.userDetails.employeeRoleId;
      const newRole = nextProps.userDetails.employeeRoleId;

      if (currentRole !== newRole && newRole === roles.ADMIN) {
        const adminMenu = [...this.state.menuItems, ...adminItems];
        this.setState({ menuItems: adminMenu });
      }
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

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), NavContainer);
