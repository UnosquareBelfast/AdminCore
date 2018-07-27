import React from 'react';
import { PropTypes as PT } from 'prop-types';
import holidayStatus from '../../utilities/holidayStatus';

const LengendContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      updateCalendarEvents: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      const { PENDING, APPROVED, REJECTED, WFH, SICK } = holidayStatus;
      this.state = {
        eventsKeys: [
          {
            eventStatusId: 2,
            key: APPROVED,
            type: 'holiday',
            active: false,
          },
          {
            eventStatusId: 1,
            key: PENDING,
            type: 'holiday',
            active: false,
          },
          {
            eventStatusId: 3,
            key: REJECTED,
            type: 'holiday',
            active: false,
          },
          {
            eventStatusId: 4,
            key: WFH,
            type: 'status',
            active: false,
          },
          {
            eventStatusId: 5,
            key: SICK,
            type: 'status',
            active: false,
          },
        ],
      };
    }

    setKeyActiveState = eventStatusId => {
      let updatedList = [...this.state.eventsKeys];
      for (let key of updatedList) {
        if (key.eventStatusId === eventStatusId) {
          key.active = !key.active;
        }
      }
      this.props.updateCalendarEvents(eventStatusId);
    };

    render() {
      return (
        <Wrapped
          eventsKeyList={this.state.eventsKeys}
          onToggleKey={this.setKeyActiveState}
        />
      );
    }
  };

export default LengendContainer;
