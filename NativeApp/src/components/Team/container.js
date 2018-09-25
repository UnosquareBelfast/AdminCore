import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import getTeamEvent from '../../utilities/team';
import { includes, clone, keys} from 'lodash';

export default Container => class extends Component {
  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }),
  }

  static defaultProps = {
    navigation: {},
  }

  state = { events: [] }

  componentDidMount() {
    const { navigation } = this.props;

    this.sub = navigation.addListener('didFocus', () => {
      getTeamEvent()
        .then(events => this.setState({ events: this.renamingKeys(events) }));
    });
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  // rename = (object, key, newKey) => {
  //   object.map((obj) => {
  //     if (includes(keys(obj), key)) {
  //       obj.newKey = clone(obj.key, true);
  //       delete obj.key;
  //     }
  //   });
  // }

  renamingKeys = (events) => {
    // this.rename(events, 'team', 'title');
    // this.rename(events, 'members', 'data');
    // console.log('????mmebers', includes(keys(events), 'members'))

    events.map((obj) => {
    //   console.log(includes(keys(obj), 'team'));
    //   console.log(includes(keys(obj), 'members'));

    //   obj.data = clone(obj.members, true);
    //   obj.title = clone(obj.team, true);
    //   delete obj.team;
    //   delete obj.data;
    //   // console.log('the OBJ*****', obj)
    });
  
    // return object;

    // includes(keys(events), 'team');
    // events.title = clone(events.team, true);
    // delete events.team;

    // includes(keys(events), 'members');
    // events.title = clone(events.members, true);
    // delete events.members;

    // console.log('---in the renming keys funciton', events)
    // includes(keys(events), 'members');

    events.map((event) => {
    // console.log('--IN MAP-includes', includes(keys(event), 'team'));

      event.title = event.team;
      event.data = event.members;
    });
    return events;
  }

  render() {
    const { events } = this.state;

    return (
      <Container
        events={events}
      />
    );
  }
};
