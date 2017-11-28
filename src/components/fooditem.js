import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types';

export default FoodItem = ({ name, description, price, image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topPanel}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{uri: image}}
          />
      </View>
      <View style={styles.bottomPanel}>
        <View style={styles.firstSection}>
          <Text>
            {name}
          </Text>
          <Text >
            {description}
          </Text>
        </View>
        <View style={styles.secondSection}>
          <Text>
            {price}
          </Text>
        </View>
      </View>
    </View>
  );
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
