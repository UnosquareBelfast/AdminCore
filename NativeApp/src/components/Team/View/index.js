import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { View, SectionList } from 'react-native';
import { H2 } from '../../Common';
import ListTeam from './ListTeam';
import styles from './styles';

const TeamView = (props) => {
  const { events } = props;
  return (
    <View style={styles.container}>
      <SectionList
        renderItem={({ item }) => (
          <ListTeam
            name={item.name}
            state={item.state}
          />
        )}
        renderSectionHeader={({ section }) => (
          <H2 style={styles.sectionListHeader}>{section.title}</H2>
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
