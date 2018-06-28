import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import container from './container';
import {
  CreateUser,
  UserListing,
  PendingHolidays,
  AllHolidays,
} from '../../components';
import { Card } from '../../components/common';
import Sidebar from './Sidebar';
import { withAuth } from '../../hoc';
import { flowRight } from 'lodash';
import {
  SidebarContainer,
  Container,
  MainContentContainer,
  Refresh,
} from './styled';

export const Admin = props => (
  <Container>
    <SidebarContainer>
      <Sidebar />
    </SidebarContainer>
    <MainContentContainer>
      <Switch>
        <Route path="/admin/createEmployee" component={CreateUser} />
        <Route
          path="/admin/employees"
          render={() => (
            <Card>
              <h3>Employees</h3>
              <Refresh onClick={props.refreshUsers}>Refresh</Refresh>
              <UserListing history={props.history} users={props.users} />
            </Card>
          )}
        />
        <Route path="/admin/pendingHolidays" component={PendingHolidays} />
        <Route path="/admin/holidays" component={AllHolidays} />
      </Switch>
    </MainContentContainer>
  </Container>
);

Admin.propTypes = {
  userDetails: PT.object,
  users: PT.array,
  refreshUsers: PT.func,
  history: PT.object,
};

const enhance = flowRight(
  withAuth,
  container,
);
export default enhance(Admin);
