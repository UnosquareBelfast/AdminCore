import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { LayoutContainer } from './styled';

const Layout = props => (
  <Fragment>
    <LayoutContainer>{props.children}</LayoutContainer>
  </Fragment>
);

Layout.propTypes = {
  children: PT.node,
};

export default Layout;
