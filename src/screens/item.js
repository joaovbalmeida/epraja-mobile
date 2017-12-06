import React from 'react';
import { View, Text, Image, KeyboardAvoidingView, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { addToCart } from '../store/actions/action.session';

export class ItemScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerRight: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      itemQty: 1,
    }
  }

  counterAdd() {
    this.setState({
      itemQty: this.state.itemQty + 1,
    });
  }

  counterDecrease() {
    if(this.state.itemQty > 1) {
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
      this.props.navigation.state.params.price
    );
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.content}
            keyboardVerticalOffset={150}
          >
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: this.props.navigation.state.params.image }}
              />
            <View style={styles.firstSection}>
              <Text style={styles.description}>
                {this.props.navigation.state.params.description}
              </Text>
              <Text style={styles.price}>
                {this.props.navigation.state.params.price}
              </Text>
            </View>
            <View style={styles.secondSection}>
              <Text>
                Marcar a quantidade desejada
              </Text>
              <Button
                title="+"
                buttonStyle={styles.stepper}
                onPress={() => this.counterAdd()}
              />
              <Text style={styles.qty}>
                {this.state.itemQty}
              </Text>
              <Button
                title="-"
                buttonStyle={styles.stepper}
                onPress={() => this.counterDecrease()}
              />
            </View>
            <TextInput
              style={styles.textInput}
              multiline={true}
              placeholder="Deixe sua observação em relação a detalhes de seu pedido que tentaremos atende-lo"
            />
            <View style={styles.thirdSection}>
              <Button
                title="INCLUIR AO PEDIDO"
                buttonStyle={styles.button}
                onPress={() => this.addItemToCart()}
                />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
  },
  image: {
    height: '45%',
    width: '100%',
  },
  firstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '12%',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  description: {
    flex: 4,
    marginRight: 5,
  },
  price: {
    flex: 1,
  },
  secondSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '10%',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  label: {

  },
  stepper: {
    height: 40,
    width: 40,
  },
  qty: {
    fontSize: 18,
  },
  textInput: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    fontSize: 14,
    height: '12%',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 1,
    color: 'black',
  },
  thirdSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 5,
    width: 175,
    height: 50,
  },
});

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    addToCart: (id, qty, name, price) => dispatch(addToCart(id, qty, name, price)),
  }
);

export default connect(null, mapDispatchToProps)(ItemScreen);
