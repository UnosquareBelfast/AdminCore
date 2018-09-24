import React from 'react';
import container from './container';
import { Ul } from './styled';
import { PropTypes as PT } from 'prop-types';
import { Spinner } from '../../common';
import { SpinnerContainer } from '../../../hoc/AuthUserAndStore/styled';

const legacyHolidayMessagelist = (legacyMessages, loading) => {

  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  } else {
    if (!legacyMessages.length) {
      return null;
    }
    const employee1 = { name: legacyMessages[0].author, eventMessageId: legacyMessages[0].eventMessageId };
    const employeeMessage = 'employee-message';
    return (
      <Ul>
        {legacyMessages.map((element, index) => {
          return (<li key={index} className={element.author === employee1.name ? employeeMessage + '-1' : employeeMessage + '-2'}>
            <div className="legacy-message-container">
              <h3>{element.author + ':'} </h3>
              <div className="legacy-message">
                <h3>{element.message}</h3>
              </div>
            </div>
          </li>);
        })}
      </Ul>
    );
  }
};

const LegacyMessageList = props => {
  const { legacyMessages, loading } = props;
  return (<div><h1>Message History</h1>{legacyHolidayMessagelist(legacyMessages, loading)}</div>);
};

LegacyMessageList.propTypes = {
  legacyMessages: PT.array.isRequired,
  loading: PT.bool.isRequired,
};

export default container(LegacyMessageList);
