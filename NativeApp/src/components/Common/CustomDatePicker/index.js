import React, { Component, Fragment } from 'react';
import {
  View,
  DatePickerIOS,
  DatePickerAndroid,
  Modal,
  StyleSheet,
  Button,
  Platform,
  TouchableHighlight,
  Animated,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { P } from '..';


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
      fadeAnim: new Animated.Value(0),
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
    this.animateOverlay(visible ? 1 : 0);
  }

  formatDate = date => moment(date).toDate();

  animateOverlay = (value) => {
    const { fadeAnim } = this.state;
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(
        fadeAnim,
        {
          toValue: value,
          duration: 300,
          useNativeDriver: true,
        }
      ),
    ]).start();
  }

  render() {
    const {
      chosenDate,
      setDate,
      minimumDate,
    } = this.props;

    const { modalVisable, fadeAnim } = this.state;

    return (
      <Fragment>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => this.onDatePress()}
          style={styles.container}
        >
          <View>
            <View style={styles.dateInput}>
              <P>
                {chosenDate}
              </P>
              <Icon
                name="calendar"
                type="font-awesome"
                color="#00DCFA"
                size={20}
              />
            </View>

            <Modal
              animationType="slide"
              transparent
              visible={modalVisable}
              onRequestClose={() => this.setModalVisible(false)}
            >
              <View style={styles.dateContainer}>
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
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
    marginVertical: 5,
  },
  dateInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
