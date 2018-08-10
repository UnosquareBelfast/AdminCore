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
      selectedIndex: 0,
    };
  }

  selected = i => this.setState({ selectedIndex: i });

  render() {
    const { eventType, selectedIndex } = this.state;
    const checkBox = eventType.map((event, index) => {
      const isSelected = selectedIndex === index;

      return (
        <TouchableOpacity
          key={index}
          onPress={() => this.selected(index)}
          style={[styles.box, { backgroundColor: isSelected ? event.color : 'white' }]}
        >
          <Icon
            name={event.icon}
            type="font-awesome"
            size={20}
            color={isSelected ? 'white' : event.color}
            containerStyle={{ paddingBottom: 10 }}
          />
          <Text style={[styles.textStyle, { color: isSelected ? 'white' : 'grey' }]}>{event.type}</Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        {checkBox}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    width: 100,
    height: 100,
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
    fontSize: 12,
    color: 'grey',
  },
});

export default EventTypeGroup;
