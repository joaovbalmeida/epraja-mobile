import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ImageBackground, StyleSheet, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
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
        <ImageBackground
          style={styles.image}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.content}
              keyboardVerticalOffset={150}
            >
              <View style={styles.view}>
                <Text style={{ marginLeft: 30 }}>
                  Nº DA MESA
                </Text>
                <TextInput
                  placeholder=""
                  style={styles.textInput}
                  keyboardType="numeric"
                  onChangeText={tableNumber => this.setState({ number: Number(tableNumber) })}
                />
              </View>
              <Button
                title="Entrar"
                onPress={() => this.createBill(this.state.number)}
                containerViewStyle={styles.button}
                textStyle={styles.buttonText}
                color="black"
              />
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </ImageBackground>
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
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightblue',
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 25,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 2,
    height: 80,
    width: '100%',
  },
  textInput: {
    backgroundColor: 'white',
    height: 60,
    width: '50%',
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderRadius: 5,
    color: 'black',
    textAlign: 'right',
  },
  button: {
    backgroundColor: 'white',
    height: 46,
    width: '50%',
  },
  buttonText: {
    textAlign: 'center',
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
