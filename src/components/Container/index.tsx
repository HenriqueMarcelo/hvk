import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.light,
    paddingTop: 18,
    paddingBottom: 18,
    flex: 1,
  },
});

const Container: React.FC = ({children}) => (
  <ScrollView style={styles.content}>{children}</ScrollView>
);

export default Container;
