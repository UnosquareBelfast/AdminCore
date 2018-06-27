import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import Header from './header';
import { LayoutContainer } from './styled';

const Layout = props => {
  console.log(
    'props.history.location.pathname :',
    props.history.location.pathname
  );
  return (
    <Fragment>
      <Header isAuthenticated={props.isAuthenticated} history={props.history} />
      <LayoutContainer history={props.history.location.pathname}>
        {props.children}
      </LayoutContainer>
    </Fragment>
  );
};

Layout.propTypes = {
  history: PT.object,
  isAuthenticated: PT.bool,
  children: PT.node
};

export default Layout;
