import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { CreateUser } from '../../components';
import { Card } from '../../components/common';
import { Layout, withAuth } from '../../hoc';
import { flowRight } from 'lodash';
import { Sidebar, Container, MainContentContainer } from './styled';

const Admin = props => {
  return (
    <Layout {...props}>
      <Container>
        <Sidebar>
          <CreateUser />
        </Sidebar>
        <MainContentContainer>
          <Card>
            <h3>Admin Panel</h3>
            <p>Other admin options... List of users?</p>
          </Card>
        </MainContentContainer>
      </Container>
    </Layout>
  );
};

Admin.propTypes = {
  userDetails: PT.object,
};

const enhance = flowRight(
  withAuth,
  container,
);
export default enhance(Admin);
