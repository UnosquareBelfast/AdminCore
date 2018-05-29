import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import Header from './header';
import { LayoutContainer } from './styled';

const Layout = (props) => (
  <Fragment>
    <Header {...props} />
    <LayoutContainer>
      {props.children}
    </LayoutContainer>
  </Fragment>
);

Layout.propTypes = {
  children: PT.node,
};

export default Layout;
