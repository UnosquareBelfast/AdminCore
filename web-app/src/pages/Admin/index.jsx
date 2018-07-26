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
  CreateTeam,
  ViewTeams,
} from '../../components';
import { Container, MainContentContainer, Refresh } from './styled';

export const Admin = props => (
  <Container>
    <MainContentContainer>
      <Switch>
        <Route exact path="/admin/teams/" component={ViewTeams} />
        <Route path="/admin/teams/new/" component={CreateTeam} />
        <Route exact path="/admin/contracts/" component={ViewContracts} />
        <Route path="/admin/contracts/new/" component={CreateContract} />
        <Route path="/admin/employees/new/" component={CreateUser} />
        <Route
          exact
          path="/admin/employees/"
          render={() => (
            <Fragment>
              <h2>Employees</h2>
              <Refresh onClick={props.refreshUsers}>Refresh</Refresh>
              <UserListing history={props.history} users={props.users} />
            </Fragment>
          )}
        />
        <Route path="/admin/holidays/pending/" component={PendingHolidays} />
        <Route path="/admin/holidays/" component={AllHolidays} />
        <Route
          exact
          path="/admin/clients/"
          render={() => <AllClients history={props.history} />}
        />
        <Route path="/admin/clients/new/" component={CreateClient} />
        <Route path="/admin/clients/:clientId/" component={CreateClient} />
        <Route path="/admin/" component={AdminDashboard} />
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
