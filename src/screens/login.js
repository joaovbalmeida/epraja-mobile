import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ImageBackground, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity, Image } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import api from '../api';
import { updateTableNumber, updateBusinessID, fetchMenuCategories, updateSession, updateBill } from '../store/actions/action.session';

class LoginScreen extends React.Component {
  static navigationOptions = {
    headerRight: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  componentDidUpdate() {
    if (this.props.sessionActive) {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'menuStack' }),
        ],
      }));
    }
  }

  createBill(tableNumber) {
    const bill = {};
    bill.table = this.state.number;
    bill.billStatus = this.props.billStatuses.filter(item => item.name.match('Aberta'))[0].id;
    bill.business = this.props.navigation.state.params.id;
    api.bills.create(bill)
      .then((json) => {
        this.props.fetchMenuCategories(this.props.navigation.state.params.id);
        this.props.updateBusinessID(this.props.navigation.state.params.id);
        this.props.updateNumber(tableNumber);
        this.props.updateBill(json._id);
        this.props.updateSession(true);
      }, (error) => {
        console.log(error);
        Alert.alert(
          'Mesa Ocupada',
          'Já existe uma conta aberta para está mesa.',
          [
            { text: 'Ok' },
          ],
          { cancelable: false }
        );
      })
      .catch(error => error);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.content}>
              <View style={styles.logo}>
                <Image
                  source={require('../utils/logo.png')}
                  width={194}
                  height={60}
                  />
              </View>
              <View style={styles.midSection}>
                <Text style={{ fontFamily: 'daxline-regular' }}>
                  Sentou, qual o número da sua mesa?
                </Text>
                <Text style={{ fontFamily: 'daxline-regular' }}>
                  Não sentou, pede o número de entrada ao garçom.
                </Text>
              </View>
              <View style={styles.bottomSection}>
                <View style={{ width: '50%', alignItems: 'flex-start' }}>
                  <Text style={{ fontFamily: 'daxline-medium' }}>
                    número da mesa
                  </Text>
                </View>
                <TextInput
                  placeholder=""
                  style={styles.textInput}
                  keyboardType="numeric"
                  underlineColorAndroid="white"
                  onChangeText={tableNumber => this.setState({ number: Number(tableNumber) })}
                  />
                <TouchableOpacity
                  onPress={() => this.createBill(this.state.number)}
                  style={styles.button}
                  >
                  <Text style={styles.buttonText}>
                    é pra entrar
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: '20%' }}>
              </View>
              <KeyboardSpacer
                topSpacing={-150}
              />
            </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
  fetchMenuCategories: PropTypes.func.isRequired,
  updateBusinessID: PropTypes.func.isRequired,
  updateSession: PropTypes.func.isRequired,
  updateNumber: PropTypes.func.isRequired,
  updateBill: PropTypes.func.isRequired,
  sessionActive: PropTypes.bool.isRequired,
  billStatuses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#EDEAE2',
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 25,
  },
  logo: {
    width: '100%',
    height: '20%',
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  midSection: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  bottomSection: {
    alignItems: 'flex-end',
    height: 100,
    width: '100%',
    marginRight: 30,
  },
  textInput: {
    backgroundColor: 'white',
    height: 60,
    width: '50%',
    paddingHorizontal: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#423736',
    color: 'black',
    fontFamily: 'daxline-regular',
    fontSize: 20,
    textAlign: 'left',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#423736',
    height: 30,
    marginTop: 10,
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'daxline-regular'
  },
});

const mapStateToProps = state => (
  {
    billStatuses: state.sessionReducer.billStatuses,
    sessionActive: state.sessionReducer.sessionActive,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    updateNumber: number => dispatch(updateTableNumber(number)),
    updateBill: bill => dispatch(updateBill(bill)),
    updateBusinessID: id => dispatch(updateBusinessID(id)),
    fetchMenuCategories: id => dispatch(fetchMenuCategories(id)),
    updateSession: active => dispatch(updateSession(active)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
