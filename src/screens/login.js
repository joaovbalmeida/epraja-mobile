import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ImageBackground, StyleSheet, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RectangleButton } from 'react-native-button-component';
import PropTypes from 'prop-types';
import { updateTableNumber, updateBusinessID, fetchMenuCategories } from '../store/actions/action.session';

export class LoginScreen extends React.Component {
  static navigationOptions = {
    headerRight: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      number: '0',
    };
  }

  navigateToMenu(tableNumber) {
    this.props.fetchMenuCategories(this.props.navigation.state.params.id);
    this.props.updateBusinessID(this.props.navigation.state.params.id);
    this.props.updateNumber(tableNumber);
    this.props.navigation.navigate('drawerStack');
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
              <Text>
                {this.props.number}
              </Text>
              <TextInput
                placeholder="Table Number"
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={tableNumber => this.setState({ number: tableNumber })}
              />
              <RectangleButton
                title="Entrar"
                onPress={() => this.navigateToMenu(this.state.number)}
                style={styles.button}
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
  updateNumber: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
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
    alignItems: 'center',
    marginBottom: 25,
  },
  textInput: {
    minWidth: 250,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    color: 'black',
  },
  button: {
    backgroundColor: 'white',
    minWidth: 250,
  },
});

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    updateNumber: number => dispatch(updateTableNumber(number)),
    updateBusinessID: id => dispatch(updateBusinessID(id)),
    fetchMenuCategories: id => dispatch(fetchMenuCategories(id)),
  }
);

const mapStateToProps = state => (
  {
    number: state.sessionReducer.tableNumber,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
