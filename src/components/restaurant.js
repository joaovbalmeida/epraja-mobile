import React, { Component } from 'react';
import {Text, Image, StyleSheet, View} from 'react-native'
import { RectangleButton, CircleButton } from 'react-native-button-component';

export default class RestaurantItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'TT Burger',
      description: 'Hamburgeria',
      price: '',
      image: '',
    };
  }

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
            <Text>
              {this.props.description}
            </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    height: 150,
    width: '100%',
    backgroundColor: 'lightblue'
  },
  leftPanel: {
    flex: 1,
    height: 150,
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
    height: 150,
    backgroundColor: 'green'
  },
  firstSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginTop: 5,
    marginRight: 10,
  },
  secondSection: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  thirdSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  price: {
    marginRight: '10%',
  },
  checkin:{
    marginRight: '10%',
  },
  infoView: {
    justifyContent: 'center',
    marginRight: '5%',
  },
  menu: {

  }
});
