import React from 'react';
import { View, Text, Image, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { addToCart } from '../store/actions/action.session';

export class ItemScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: (Platform.OS === 'android' ? { backgroundColor: '#B9C8C5', paddingTop: Constants.statusBarHeight, height: Constants.statusBarHeight + 56 } : { backgroundColor: '#B9C8C5' }),
    headerRight: null,
    headerLeft:
    <TouchableOpacity onPress={ () => { navigation.goBack() }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
        <Image
          source={require('../utils/arrow.png')}
          width={27}
          height={41}
          />
        <Text style={{ fontFamily: 'daxline-regular', color: '#231F1F' }}>
          voltar
        </Text>
      </View>
    </TouchableOpacity>
  });

  constructor(props) {
    super(props);
    this.state = {
      itemQty: 1,
    };
  }

  counterAdd() {
    this.setState({
      itemQty: this.state.itemQty + 1,
    });
  }

  counterDecrease() {
    if (this.state.itemQty > 1) {
      this.setState({
        itemQty: this.state.itemQty - 1,
      });
    }
  }

  addItemToCart() {
    this.props.addToCart(
      this.props.navigation.state.params.id,
      this.state.itemQty,
      this.props.navigation.state.params.name,
      this.props.navigation.state.params.price,
      this.props.navigation.state.params.menuCategory,
    );
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 2.4, justifyContent: 'center' }}>
              <Text style={styles.title}>
                {this.props.navigation.state.params.name}
              </Text>
            </View>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: this.props.navigation.state.params.image }}
            />
            <View style={{ flex: 1.3, marginHorizontal: 20, marginVertical: 5, justifyContent: 'center', }}>
              <Text style={styles.price}>
                {this.props.navigation.state.params.price}
              </Text>
            </View>
            <View style={{ flex: 5, marginHorizontal: 20 }}>
              <Text
                style={styles.description}
                allowFontScaling={false}
                ellipsizeMode="tail"
                numberOfLines={6}
                >
                {this.props.navigation.state.params.description}
              </Text>
            </View>
            <View style={styles.section}>
              <Text
                allowFontScaling={false}
                style={{ textAlign: 'right', fontFamily: 'daxline-medium', fontSize: 13 }}
              >
                Quantos deste você quer?{"\n"}
                é pra marcar
              </Text>
              <TouchableOpacity
                style={styles.stepper}
                onPress={() => this.counterAdd()}
                >
                <Text style={{ fontSize: 40 }}>
                  +
                </Text>
              </TouchableOpacity>
              <View style={{ width: 45 }}>
                <Text style={styles.qty}>
                  {this.state.itemQty}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.stepper}
                onPress={() => this.counterDecrease()}
              >
                <Text style={{ fontSize: 60, paddingBottom: 4 }}>
                  -
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Cuidamos do seu pedido. Diz como você gosta, a gente vai tentar atender."
              returnKeyType="done"
              allowFontScaling={false}
              numberOfLines={10}
            />
            <View style={styles.bottom}>
              <TouchableOpacity onPress={() => this.addItemToCart()}>
                <View style={styles.button}>
                  <Text style={{ fontFamily: 'daxline-medium' }}>
                    vai pro carrinho
                  </Text>
                  <Image
                    source={require('../utils/buttonCart.png')}
                    width={19}
                    height={19}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <KeyboardSpacer/>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

ItemScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B9C8C5',
  },
  title: {
    fontFamily: 'daxline-medium',
    color: 'black',
    fontSize: 16,
    paddingLeft: 20,
  },
  image: {
    flex: 7.5,
    width: '100%',
    backgroundColor: 'white',
  },
  description: {
    fontFamily: 'daxline-regular',
    lineHeight: 18,
  },
  price: {
    textAlign: 'right',
    fontFamily: 'daxline-medium',
  },
  section: {
    flex: 2.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  stepper: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qty: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '500',
  },
  textInput: {
    height: 60,
    marginVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    fontSize: 12,
    borderWidth: 0.7,
    borderColor: 'black',
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'daxline-regular',
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 17,
  },
  bottom: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    height: 35,
    width: 140,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#7EAAAE',
  },
});

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    addToCart: (id, qty, name, price) => dispatch(addToCart(id, qty, name, price)),
  }
);

export default connect(null, mapDispatchToProps)(ItemScreen);
