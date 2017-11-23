import React, { Component } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native'
import { RectangleButton, CircleButton } from 'react-native-button-component';

export default class RestaurantItem extends Component {

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
        <View style={styles.leftPanel}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: this.props.image}}
            />
        </View>
        <View style={styles.rightPanel}>
          <View style={styles.firstSection}>
            <Text>
              {this.props.name}
            </Text>
            <Text style={styles.price}>
              {this.props.price}
            </Text>
          </View>
          <View style={styles.secondSection}>
            <View style={styles.descriptionView}>
              <Text>
                {this.props.description}
              </Text>
            </View>
            <View style={styles.infoView}>
              <CircleButton
                style={styles.info}
                size={30}
                />
            </View>
          </View>
          <View style={styles.thirdSection}>
            <RectangleButton
              style={styles.menu}
              height={25}
              width={50}
              />
            <RectangleButton
              style={styles.checkin}
              height={25}
              width={50}
              />
          </View>
        </View>
      </View>
    );
  }
}

const sectionStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 5,
  marginRight: 5,
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    height: 180,
    width: '100%',
    backgroundColor: 'black'
  },
  leftPanel: {
    flex: 1,
    height: 180,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  rightPanel: {
    flex: 2,
    height: 180,
    backgroundColor: 'white'
  },
  firstSection: {
    flex: 1,
    marginTop: 5,
    ...sectionStyle
  },
  secondSection: {
    flex: 3,
    paddingTop: 5,
    paddingBottom: 5,
    ...sectionStyle
  },
  thirdSection: {
    flex: 1,
    marginBottom: 5,
    ...sectionStyle
  },
  price: {
    marginRight: '10%',
  },
  checkin:{
    marginRight: '10%',
  },
  descriptionView: {
    flex: 5,
  },
  infoView: {
    flex: 1,
    justifyContent: 'center',
    marginRight: '5%',
  },
  menu: {
  }
});
