import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import container from './container';
import {
  CreateUser,
  UserListing,
  PendingHolidays,
  AllHolidays,
  AdminDashboard,
} from '../../components';
import { Card } from '../../components/common';
import { withAuth } from '../../hoc';
import { flowRight } from 'lodash';
import { Container, MainContentContainer, Refresh } from './styled';

export const Admin = props => (
  <Container>
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
        <Route path="/admin" component={AdminDashboard} />
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

const enhance = flowRight(withAuth, container);
export default enhance(Admin);
