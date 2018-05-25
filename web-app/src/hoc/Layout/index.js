import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import Header from './header';

const Layout = (props) => (
  <Fragment>
    <Header {...props} />
    {props.children}
  </Fragment>
);

Layout.propTypes = {
  children: PT.node,
};

export default Layout;
