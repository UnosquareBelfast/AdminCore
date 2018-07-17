import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      users: PT.array,
      actions: PT.array,
      onView: PT.func.isRequired,
    };

    static defaultProps = {
      users: [],
      actions: [],
    };

    constructor(props) {
      super(props);
      this.state = { users: props.users };
    }

    componentWillUpdate(nextProps) {
      if (nextProps.users != this.props.users) {
        this.setState({ users: nextProps.users });
      }
    }

    buildActions = () => {
      const actionStrings = this.props.actions;
      const actionFuncs = {};

      //NOTE: This is ALL actions available, add to this list if you add more
      const actions = {};

      actionStrings.map(action => {
        actionFuncs[action] = actions[action];
      });

      return actionFuncs;
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          view={this.props.onView}
          actions={this.buildActions()}
        />
      );
    }
  };
