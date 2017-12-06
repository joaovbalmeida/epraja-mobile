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
    <Text>
      {countdown}
    </Text>
    <Text>
      {qty}
    </Text>
    <Text>
      {name}
    </Text>
    <Text>
      {price}
    </Text>
  </View>
);

MenuItem.propTypes = {
  countdown: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

MenuItem.defaultProps = {
  description: '',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 30,
    width: '100%',
  },
});

export default OrderItem;
