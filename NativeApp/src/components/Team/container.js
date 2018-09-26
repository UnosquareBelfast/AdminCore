import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { includes, clone, keys } from 'lodash';
import getTeamEvent from '../../utilities/team';

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
        .then(events => this.setState({ events: this.sortingEvents(events) }));
    });
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  renameKey = (object, key, newKey) => {
    object.map((obj) => {
      if (includes(keys(obj), key)) {
        obj[newKey] = clone(obj[key], true);
        delete obj[key];
      }
      return object;
    });
  }

  sortingEvents = (events) => {
    this.renameKey(events, 'team', 'title');
    this.renameKey(events, 'members', 'data');
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
