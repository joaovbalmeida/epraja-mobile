import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ImageBackground, StyleSheet, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { updateTableNumber, updateBusinessID, fetchMenuCategories, fetchItemStatuses, fetchBillStatuses, updateSession, fetchSurveyRates } from '../store/actions/action.session';

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

  navigateToMenu(tableNumber) {
    this.props.updateSession(1);
    this.props.fetchMenuCategories(this.props.navigation.state.params.id);
    this.props.updateBusinessID(this.props.navigation.state.params.id);
    this.props.fetchSurveyRates();
    this.props.fetchItemStatuses();
    this.props.fetchBillStatuses();
    this.props.updateNumber(tableNumber);
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'menuStack'})
      ]
    }));
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
                onPress={() => this.navigateToMenu(this.state.number)}
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
  fetchItemStatuses: PropTypes.func.isRequired,
  fetchBillStatuses: PropTypes.func.isRequired,
  updateBusinessID: PropTypes.func.isRequired,
  updateNumber: PropTypes.func.isRequired,
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
    width: '100%',
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
  }
});

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    updateNumber: number => dispatch(updateTableNumber(number)),
    updateBusinessID: id => dispatch(updateBusinessID(id)),
    fetchMenuCategories: id => dispatch(fetchMenuCategories(id)),
    fetchItemStatuses: () => dispatch(fetchItemStatuses()),
    fetchBillStatuses: () => dispatch(fetchBillStatuses()),
    updateSession: active => dispatch(updateSession(active)),
    fetchSurveyRates: () => dispatch(fetchSurveyRates())
  }
);

export default connect(null, mapDispatchToProps)(LoginScreen);
