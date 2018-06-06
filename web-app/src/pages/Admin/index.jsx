import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { CreateUser, UserListing } from '../../components';
import { Card } from '../../components/common';
import { Layout, withAuth } from '../../hoc';
import { flowRight } from 'lodash';
import { Sidebar, Container, MainContentContainer, Refresh } from './styled';

const Admin = props => (
  <Layout {...props}>
    <Container>
      <Sidebar>
        <CreateUser />
      </Sidebar>
      <MainContentContainer>
        <Card>
          <h3>Employees</h3>
          <Refresh onClick={props.refresh}>Refresh</Refresh>
          <UserListing users={props.users} />
        </Card>
      </MainContentContainer>
    </Container>
  </Layout>
);

Admin.propTypes = {
  userDetails: PT.object,
  users: PT.array,
  refresh: PT.func,
};

const enhance = flowRight(
  withAuth,
  container,
);
export default enhance(Admin);
