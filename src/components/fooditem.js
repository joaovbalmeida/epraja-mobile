import React, { Component } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types';

export default class FoodItem extends Component {

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      description: nextProps.description,
      price: nextProps.price,
      image: nextProps.image,
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.topPanel}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: this.props.image}}
            />
        </View>
        <View style={styles.bottomPanel}>
          <View style={styles.firstSection}>
            <Text>
              {this.props.name}
            </Text>
            <Text >
              {this.props.description}
            </Text>
          </View>
          <View style={styles.secondSection}>
            <Text>
              {this.props.price}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

FoodItem.propTypes = {
  name: PropTypes.string.isRequired,
  description : PropTypes.string,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const section = {
  marginLeft: 5,
  marginTop: 5,
  marginRight: 5,
  marginLeft: 5
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 250,
    width: '100%',
  },
  topPanel: {
    flex: 1,
    height: 180,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  bottomPanel: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'lightblue'
  },
  firstSection: {
    flex: 4.5,
    ...section
  },
  secondSection: {
    flex: 1,
    ...section
  },
});
