import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import { updateModal, resetState } from '../store/actions/action.session';
import api from '../api';

class OrderScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
    }
  }

  checkout() {
    this.setState({ disabled: true })
    api.bills.find({ query: { _id: this.props.bill } })
      .then((response) => {
      if (response.data.length > 0) {
        if (response.data[0].menuItems.length === 0) {
          const status = this.props.billStatuses.find(item => item.name === 'Fechada').id;
          api.bills.patch(this.props.bill, { billStatus: status })
            .then(() => {
              this.setState({ disabled: false });
              this.props.updateModal(false);
              this.props.resetState();
            }, (error) => this.setState({ disabled: false }));
        }
        this.setState({ disabled: false });
      }
      this.setState({ disabled: false });
    }, () => this.setState({ disabled: false }));
  }

  render() {
    const cart = [];
    if(this.props.cart.length === 0){
      cart.push(<Image
                  source={require('../utils/emptyCart.png')}
                  width={30}
                  height={31}
                  />)
    } else {
      cart.push(<Image
                  source={require('../utils/cart.png')}
                  width={30}
                  height={31}
                  />)
    }
    return (
      <View style={styles.modal}>
        <View style={styles.leftSection}>
          <TouchableOpacity
            onPress={() => this.props.updateModal(false)}
            style={styles.backButton}
            >
            <View style={styles.backButtonView}>
              <Image
                source={require('../utils/arrow.png')}
                width={27}
                height={41}
                />
              <Text style={styles.closeButton}>voltar</Text>
            </View>
          </TouchableOpacity>
        </View>
          <Text style={styles.title}>
            É NO CARRINHO
          </Text>
        <View style={styles.rightSection}>
          {cart[0]}
        </View>
        <View style={styles.bottom}>
          <Button
            title="MONTAGEM DO SEU PEDIDO"
            fontFamily="daxline-regular"
            fontSize={13}
            buttonStyle={styles.button}
            onPress={() => this.props.navigation.navigate('assemblyScreen')}
          />
          <Button
            title="PEDIDOS PENDENTES"
            fontFamily="daxline-regular"
            fontSize={13}
            buttonStyle={styles.button}
            onPress={() => this.props.navigation.navigate('requestScreen')}
          />
          <Button
            title="CONTA"
            fontFamily="daxline-regular"
            fontSize={13}
            buttonStyle={styles.button}
            onPress={() => this.props.navigation.navigate('billScreen')}
          />
        </View>
        {
          this.props.sessionActive ?
            <View style={{ alignItems: 'flex-start', width: '100%', paddingHorizontal: 30, paddingTop: 40 }}
            >
              <Button
                title="CHECK OUT"
                fontFamily="daxline-regular"
                fontSize={13}
                buttonStyle={styles.checkout}
                disabled={this.state.disabled}
                onPress={() => this.checkout()}
              />
            </View> : null
        }
      </View>
    );
  }
}

OrderScreen.propTypes = {
  updateModal: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: '60%',
    backgroundColor: '#EDEAE2',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  leftSection: {
    width: '100%',
    paddingHorizontal: 10,
  },
  rightSection: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  bottom: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    height: '70%',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  closeButton: {
    fontFamily: 'daxline-regular',
    color: '#231F1F',
  },
  backButton: {
    width: 100,
  },
  backButtonView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'daxline-medium',
    color: '#7EAAAE',
  },
  button: {
    backgroundColor: '#7EAAAE',
    height: 40,
  },
  checkout: {
    backgroundColor: '#7EAAAE',
    height: 40,
  },
});

const mapStateToProps = state => (
  {
    cart: state.sessionReducer.cart,
    sessionActive: state.sessionReducer.sessionActive,
    billStatuses: state.sessionReducer.billStatuses,
    bill: state.sessionReducer.bill,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    updateModal: modalVisible => dispatch(updateModal(modalVisible)),
    resetState: () => dispatch(resetState()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
