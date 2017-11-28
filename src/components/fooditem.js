import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types';

export default class FoodItem extends Component {

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
    margin: 5,
  },
  secondSection: {
    flex: 1,
    margin: 5,
  },
});
