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
      <Text>
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
  flex: 1,
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
  },
  secondSection: {
    ...section,
  },
  thirdSection: {
    ...section,
  },
  fourthSection: {
    ...section,
  },
});

export default OrderItem;
