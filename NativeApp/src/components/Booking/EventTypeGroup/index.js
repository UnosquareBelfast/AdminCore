import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { LIGHTGREY, GREY, WHITE } from '../../../styles/colors';

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
          style={[styles.box, { backgroundColor: isSelected ? event.color : WHITE }]}
        >
          <Icon
            name={event.icon}
            type="font-awesome"
            size={20}
            color={isSelected ? WHITE : event.color}
            containerStyle={{ paddingBottom: 10 }}
          />
          <Text style={[styles.textStyle, { color: isSelected ? WHITE : 'grey' }]}>{event.type}</Text>
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    shadowRadius: 2,
    shadowColor: LIGHTGREY,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 12,
    color: GREY,
  },
});

export default EventTypeGroup;
