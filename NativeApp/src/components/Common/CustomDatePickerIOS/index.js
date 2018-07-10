import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  DatePickerIOS,
  Modal,
  StyleSheet,
  Button,
  TouchableHighlight,
} from 'react-native';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';

class CustomDatePickerIOS extends Component {
  static propTypes = {
    chosenDate: PT.string.isRequired,
    setDate: PT.func.isRequired,
    minimumDate: PT.string,
  };

  static defaultProps = {
    minimumDate: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisable: false,
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisable: visible });
  }

  render() {
    const {
      chosenDate,
      setDate,
      minimumDate,
    } = this.props;

    const { modalVisable } = this.state;

    const formatDate = date => moment(date).toDate();

    return (
      <Fragment>
        {modalVisable && <View style={styles.overlay} />}
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => this.setModalVisible(true)}
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
            >
              <View style={styles.dateContainer}>
                <View style={styles.background}>
                  <DatePickerIOS
                    date={formatDate(chosenDate)}
                    onDateChange={setDate}
                    mode="date"
                    minimumDate={formatDate(minimumDate)}
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

export default CustomDatePickerIOS;
