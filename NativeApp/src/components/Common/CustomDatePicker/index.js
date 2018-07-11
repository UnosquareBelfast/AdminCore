import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  DatePickerIOS,
  DatePickerAndroid,
  Modal,
  StyleSheet,
  Button,
  Platform,
  TouchableHighlight,
} from 'react-native';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';

class CustomDatePicker extends Component {
  static propTypes = {
    chosenDate: PT.string.isRequired,
    setDate: PT.func.isRequired,
    minimumDate: PT.string,
  };

  static defaultProps = {
    minimumDate: moment().format('YYYY-MM-DD'),
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisable: false,
    };
  }


  onDatePicked = ({ action, day, month, year }) => {
    const { setDate } = this.props;
    const newDate = new Date(year, month, day);

    if (action !== DatePickerAndroid.dismissedAction) {
      setDate(this.formatDate(newDate));
    } else {
      this.setModalVisible(false);
    }
  }

  onDatePress() {
    const { chosenDate } = this.props;

    if (Platform.OS === 'ios') {
      this.setModalVisible(true);
    } else {
      DatePickerAndroid.open({
        date: this.formatDate(chosenDate),
        mode: 'calendar',
      }).then(this.onDatePicked);
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisable: visible });
  }

  formatDate = date => moment(date).toDate();

  render() {
    const {
      chosenDate,
      setDate,
      minimumDate,
    } = this.props;

    const { modalVisable } = this.state;

    return (
      <Fragment>
        {modalVisable && <View style={styles.overlay} />}
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => this.onDatePress()}
          style={styles.container}
        >
          <View>
            <View style={styles.dateInput}>
              <Text>
                {chosenDate}
              </Text>
            </View>

            <Modal
              animationType="slide"
              transparent
              visible={modalVisable}
              onRequestClose={() => this.setModalVisible(false)}
            >
              <View style={styles.dateContainer}>
                <View style={styles.background}>
                  <DatePickerIOS
                    date={this.formatDate(chosenDate)}
                    onDateChange={setDate}
                    mode="date"
                    minimumDate={this.formatDate(minimumDate)}
                  />
                  <View style={styles.buttonContainer}>
                    <Button onPress={() => this.setModalVisible(false)} title="Done" />
                  </View>
                </View>
              </View>
            </Modal>

          </View>
        </TouchableHighlight>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  dateInput: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  background: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 30,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default CustomDatePicker;
