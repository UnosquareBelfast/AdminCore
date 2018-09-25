import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { View, SectionList } from 'react-native';
import { H3, P } from '../../Common';

const TeamView = (props) => {
  const { events } = props;
console.log('--EVENR', events)
  return (
    <View>
      <SectionList
        renderItem={({ item }) => (
          <View>
            <P>{item.name}</P>
            <P>{item.state}</P>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <H3>{section.title}</H3>
        )}
        sections={events}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};

TeamView.propTypes = {
  events: PT.arrayOf(PT.object),
};

export default TeamView;
