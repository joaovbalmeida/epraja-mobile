import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const OrderItem = ({
  countdown,
  qty,
  name,
  price,
}) => (
  <View style={styles.container}>
    <View style={styles.firstSection}>
      <Text>
        {countdown}
      </Text>
    </View>
    <View style={styles.secondsSection}>
      <Text>
        {qty}
      </Text>
    </View>
    <View style={styles.thirdSection}>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
    <View style={styles.fourthSection}>
      <Text>
        {price}
      </Text>
    </View>
  </View>
);

OrderItem.propTypes = {
  countdown: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

const section = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 30,
    width: '100%',
  },
  firstSection: {
    ...section,
    width: '18%',
  },
  secondSection: {
    ...section,
    width: '12%',
  },
  thirdSection: {
    ...section,
    width: '55%',
  },
  fourthSection: {
    ...section,
    width: '15%',
  },
});

export default OrderItem;
