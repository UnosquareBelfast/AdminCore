import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import container from './container';
import {
  CreateUser,
  CreateClient,
  UserListing,
  PendingHolidays,
  AllHolidays,
  AdminDashboard,
  CreateContract,
  ViewContracts,
  AllClients,
} from '../../components';
import { Container, MainContentContainer, Refresh } from './styled';

export const Admin = props => (
  <Container>
    <MainContentContainer>
      <Switch>
        <Route exact path="/admin/contracts/" component={ViewContracts} />
        <Route path="/admin/contracts/new" component={CreateContract} />
        <Route path="/admin/createEmployee" component={CreateUser} />
        <Route
          path="/admin/employees"
          render={() => (
            <Fragment>
              <h2>Employees</h2>
              <Refresh onClick={props.refreshUsers}>Refresh</Refresh>
              <UserListing history={props.history} users={props.users} />
            </Fragment>
          )}
        />
        <Route path="/admin/pendingHolidays" component={PendingHolidays} />
        <Route path="/admin/holidays" component={AllHolidays} />
        <Route
          path="/admin/clients"
          render={() => <AllClients history={props.history} />}
        />
        <Route path="/admin/createClient" component={CreateClient} />
        <Route path="/admin/updateClient/:clientId" component={CreateClient} />
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

export default container(Admin);
