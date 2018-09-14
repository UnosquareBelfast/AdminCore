import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../../reducers';
import { getHolidays } from '../../services/holidayService';
import swal from 'sweetalert2';
import { isEmpty } from 'lodash';
import roles from '../../utilities/roles';

const UserModalContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      user: PT.object,
      closeModal: PT.func,
      history: PT.object,
      userDetails: PT.object.isRequired,
      showModal: PT.bool,
    };

    static defaultProps = {
      showModal: false,
    };

    constructor(props) {
      super(props);
      this.state = {
        userDetails: null,
        userHolidays: [],
      };
      this.hasPermission = props.userDetails.employeeRoleId !== roles.STANDARD;
    }

    componentDidMount() {
      const { user } = this.props;
      if (isEmpty(user)) return null;
     
      if (this.hasPermission) {
        getHolidays(user.employeeId)
          .then(response => {
            this.setState({ userHolidays: response.data });
          })
          .catch(error => {
            swal(
              'Error',
              `Error getting user holiday details: ${error.message}`,
              'error'
            );
          });
      }
    }
  
    render() {
      const { closeModal, userDetails, showModal, user, history} = this.props;
      const { userHolidays } = this.state;
       
      return (
        <Wrapped 
          userDetails={userDetails}
          userHolidays={userHolidays}
          showModal={showModal}
          closeModal={closeModal}
          user={user}
          hasPermission = {this.hasPermission}
          history={history} 
          getHolidays={getHolidays} />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), UserModalContainer);
