import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const ScrollableText = ({ text }) => (
  <ScrollView style={styles.scrollView}>
    <Text style={styles.text}>
      {text}
    </Text>
  </ScrollView>
);

ScrollableText.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    padding: 15,
    margin: 5,
    textAlign: 'center',
  },
});

export default ScrollableText;

