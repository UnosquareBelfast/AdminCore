import React from 'react';
import Swal from 'sweetalert2';
import { getMessagesByEventId } from '../../../services/dashboardService';
import { PropTypes as PT } from 'prop-types';

export default Wrapped =>
  class extends React.Component {

    static propTypes = { eventId: PT.number };

    constructor(props) {
      super(props);
      this.state = { legacyMessages: [], loading: true };
    }
    
    componentDidMount() {
      this.getLegacyMessages();
    }

    getLegacyMessages = () => {
      const { legacyMessages } = this.state;
      const {eventId} = this.props;
      if (!legacyMessages.length) {
        getMessagesByEventId( eventId )
          .then(({data}) => {
            this.setState({ legacyMessages: data, loading: false });
          })
          .catch(error => {
            Swal({
              title: 'Error',
              text: error.message,
              type: 'error',
            });
          });
      }
    };

    render() {
      const { legacyMessages, loading } = this.state;
      return (
        <Wrapped legacyMessages={legacyMessages} loading={loading} />
      );
    }
  };
