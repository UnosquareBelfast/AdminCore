import React, { Fragment } from 'react';
import container from './container';
import { PropTypes as PT } from 'prop-types';
import NavMenu from './nav-menu';
import { LayoutContainer, Input } from './styled';
import { FullPageLoader } from '../../components';

export const Layout = props => {
  let drawer = null;
  const {
    isAuthenticated,
    toggleDrawer,
    drawerOpen,
    children,
    history,
    menuItems,
  } = props;

  if (isAuthenticated) {
    drawer = (
      <Fragment>
        <Input
          type="checkbox"
          id="toggle-drawer"
          onChange={toggleDrawer}
          checked={drawerOpen}
        />
        <NavMenu
          isAuthenticated={isAuthenticated}
          history={history}
          menuItems={menuItems}
          closeDrawer={toggleDrawer}
          drawerIsOpen={drawerOpen}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      {drawer}
      <LayoutContainer history={history.location.pathname}>
        <FullPageLoader />
        {children}
      </LayoutContainer>
    </Fragment>
  );
};

Layout.propTypes = {
  menuItems: PT.array.isRequired,
  history: PT.object.isRequired,
  isAuthenticated: PT.bool.isRequired,
  children: PT.node.isRequired,
  drawerOpen: PT.bool.isRequired,
  toggleDrawer: PT.func.isRequired,
};
export default container(Layout);
