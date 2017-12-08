import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

const BusinessItem = ({
  name,
  description,
  price,
  image,
  navigate,
  id,
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
        <Text>
          {name}
        </Text>
        <Text style={styles.price}>
          {price}
        </Text>
      </View>
      <View style={styles.secondSection}>
        <View style={styles.descriptionView}>
          <Text style={{ fontSize: 12 }}>
            {description}
          </Text>
        </View>
        <View style={styles.infoView}>
          <Button
            title="i"
            buttonStyle={styles.info}
          />
        </View>
      </View>
      <View style={styles.thirdSection}>
        <Button
          title="Acesse nosso cardápio"
          fontSize={10}
          buttonStyle={styles.menu}
        />
        <Button
          title="CHECK-IN"
          fontSize={10}
          buttonStyle={styles.checkin}
          onPress={() => navigate('loginScreen', { id: id })}
        />
      </View>
    </View>
  </View>
);

BusinessItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

BusinessItem.defaultProps = {
  description: '',
};

const sectionStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 5,
  marginRight: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    height: 200,
    width: '100%',
    backgroundColor: 'black',
  },
  leftPanel: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  rightPanel: {
    flex: 2,
    backgroundColor: 'white',
  },
  firstSection: {
    flex: 1,
    marginTop: 5,
    ...sectionStyle,
  },
  secondSection: {
    flex: 3,
    ...sectionStyle,
  },
  thirdSection: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    marginRight: '10%',
  },
  checkin: {
    height: 10,
  },
  descriptionView: {
    flex: 5,
  },
  menu: {
    height: 10,
  },
  info: {
    height: 30,
    width: 30,
  },
  infoView: {
    flex: 1,
    justifyContent: 'center',
    marginRight: '5%',
  },
});

export default BusinessItem;

