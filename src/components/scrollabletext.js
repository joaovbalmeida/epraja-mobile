import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const ScrollableText = ({ text }) => (
  <ScrollView style={styles.scrollView}>
    <Text
      style={styles.text}
      allowFontScaling={false}
    >
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
    fontSize: 13,
    fontFamily: 'daxline-regular',
    lineHeight: 18,
    paddingVertical: 10,
    paddingHorizontal: 30,
    margin: 5,
    textAlign: 'left',
    color: '#696950',
  },
});

export default ScrollableText;

