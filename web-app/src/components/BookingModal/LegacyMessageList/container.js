import React from 'react';
import Swal from 'sweetalert2';
import { getAllHolidays } from '../../../services/holidayService';


const testMessageArray = [{ author: 'John Mallon', eventMessageId: 1, lastModified: '2018-09-19', message: 'Sorry, low team capacity', messageTypeDescription: 'General', messageTypeId: 1 }
  , { author: 'Carl Stevenson', eventMessageId: 6, lastModified: '2018-09-19', message: 'Is there nothing you can do?', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'John Mallon', eventMessageId: 6, lastModified: '2018-09-19', message: 'Not for this date unfortunately', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'Carl Stevenson', eventMessageId: 6, lastModified: '2018-09-19', message: 'Could I swap a holiday with someone?', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'John Mallon', eventMessageId: 6, lastModified: '2018-09-19', message: 'No we need your skill set', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'Carl Stevenson', eventMessageId: 1, lastModified: '2018-09-19', message: 'I really need to get this day off', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'John Mallon', eventMessageId: 1, lastModified: '2018-09-19', message: 'I will see what I can do', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'Carl Stevenson', eventMessageId: 1, lastModified: '2018-09-19', message: 'Thankyou, I really appreciate it', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'John Mallon', eventMessageId: 1, lastModified: '2018-09-19', message: 'Sorry it cannot be changed', messageTypeDescription: 'General', messageTypeId: 1 }];


export default Wrapped =>
  class extends React.Component {

    constructor(props) {
      super(props);
      this.state = { legacyMessages: [], loading: true };
    }

    componentDidMount() {
      this.getLegacyMessages();
    }

    getLegacyMessages = () => {
      const { legacyMessages } = this.state;
      if (!legacyMessages.length) {
        getAllHolidays()
          .then(() => {
            //temporarily overwriting with test data as end point data not yet available
            this.setState({ legacyMessages: testMessageArray, loading: false });
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
