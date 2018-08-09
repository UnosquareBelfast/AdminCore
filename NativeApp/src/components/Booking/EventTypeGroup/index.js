import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class EventTypeGroup extends Component {
  constructor() {
    super();
    this.state = {
      eventType: [
        { type: 'Annual leave', icon: 'suitcase', color: '#A7BF35' },
        { type: 'Sick leave', icon: 'bed', color: '#A2798F' },
        { type: 'Working from Home', icon: 'home', color: '#399BB6' },
        { type: 'Work related travel', icon: 'plane', color: '#FF544E' },
      ],
    };
  }

  render() {
    const { eventType } = this.state;
    const checkBox = eventType.map((event, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => console.log('test')}
        style={styles.box}
      >
        <Icon
          name={event.icon}
          type="font-awesome"
          size={35}
          color={event.color}
          containerStyle={{ paddingBottom: 10 }}
        />
        <Text style={styles.textStyle}>{event.type}</Text>
      </TouchableOpacity>
    ));

    return (
      <View style={styles.container}>
        {checkBox}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    minWidth: 100,
    maxWidth: 150,
    height: 100,
    maxHeight: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowRadius: 2,
    shadowColor: 'lightgrey',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 15,
    color: 'grey',
  }
});

export default EventTypeGroup;
