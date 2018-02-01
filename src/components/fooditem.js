import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const FoodItem = ({
  name,
  description,
  price,
  image,
}) => (
  <View style={styles.container}>
    <View style={styles.topPanel}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: image }}
      />
    </View>
    <View style={styles.bottomPanel}>
      <View style={styles.firstSection}>
        <Text style={styles.firstSectionText}>
          {name}
        </Text>
        <Text style={styles.firstSectionText}>
          {price}
        </Text>
      </View>
      <View style={styles.secondSection}>
        <Text
          style={{ fontFamily: 'daxline-regular', fontSize: 13, color: '#231F1F', lineHeight: 17 }}
          allowFontScaling={false}
          ellipsizeMode="tail"
          numberOfLines={4}
        >
          {description}
        </Text>
      </View>
    </View>
  </View>
);

FoodItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

FoodItem.defaultProps = {
  description: '',
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 250,
    width: '100%',
  },
  topPanel: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  bottomPanel: {
    height: 100,
    backgroundColor: '#EDEAE2',
  },
  firstSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  firstSectionText: {
    fontFamily: 'daxline-medium',
    fontSize: 14,
    color: '#231F1F',
  },
  secondSection: {
    flex: 2.4,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
});

export default FoodItem;
