import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const DrinkItem = ({
  name,
  description,
  price,
  image,
}) => (
  <View style={styles.container}>
    <View style={styles.leftPanel}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: image }}
        />
    </View>
    <View style={styles.rightPanel}>
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

DrinkItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

DrinkItem.defaultProps = {
  description: '',
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 130,
    width: '100%',
  },
  leftPanel: {
    flex: 1.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEAE2',
    marginLeft: 10,
  },
  rightPanel: {
    flex: 3,
    height: 100,
    marginRight: 10,
    backgroundColor: '#EDEAE2',
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
  },
  firstSection: {
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  firstSectionText: {
    fontFamily: 'daxline-medium',
    fontSize: 14,
    color: '#231F1F',
  },
  secondSection: {
    height: '70%',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
});

export default DrinkItem;
