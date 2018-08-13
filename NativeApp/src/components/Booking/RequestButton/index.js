import React, { Fragment } from 'react';
import { Button } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import { UNOBLUE, RED } from '../../../styles/colors';

const RequestButton = (props) => {
  const { updateHoliday, booked, submitRequest, loading, cancelHoliday } = props;

  return (
    booked ? (
      <Fragment>
        <Button
          onPress={updateHoliday}
          title="Update Holiday"
          backgroundColor={UNOBLUE}
          borderRadius={5}
          loading={loading}
          loadingRight
        />
        <Button
          onPress={cancelHoliday}
          title="Cancel Holiday"
          containerViewStyle={{ marginTop: 10 }}
          borderRadius={5}
          loading={loading}
          loadingRight
          backgroundColor={RED}
        />
      </Fragment>
    ) : (
      <Button
        onPress={submitRequest}
        title="Request"
        backgroundColor={UNOBLUE}
        borderRadius={5}
        loading={loading}
        loadingRight
      />
    )
  );
};

export default RequestButton;

RequestButton.propTypes = {
  updateHoliday: PT.func.isRequired,
  cancelHoliday: PT.func.isRequired,
  booked: PT.bool.isRequired,
  submitRequest: PT.func.isRequired,
  loading: PT.bool.isRequired,
};
