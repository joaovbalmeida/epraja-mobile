import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

export default class ScrollableText extends React.Component {

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text,
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
        {this.props.text}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f6f6f6',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  },
});
