import React from 'react';
import { View, FlatList, StyleSheet, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart, updateCart, updateModal, resetCart, updateBill, updateSession } from '../store/actions/action.session';
import api from '../api';

class AssemblyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
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
    let price = 0;
    this.props.cart.forEach((item) => {
      price += (item.qty * item.price);
    });
    this.state = {
      totalPrice: price,
      emptyMessage: 'VOCÊ AINDA NÃO TEM NENHUM PEDIDO EM SEU CARRINHO',
    };
  }

  counterAdd(id, qty, price) {
    this.props.updateCart(id, qty + 1);
    this.setState({
      totalPrice: this.state.totalPrice + price,
    });
  }

  counterDecrease(id, qty, price) {
    if (qty > 1) {
      this.props.updateCart(id, qty - 1);
      this.setState({
        totalPrice: this.state.totalPrice - price,
      });
    }
  }

  removeItem(id, qty, price) {
    Alert.alert(
      'Atenção',
      'Deseja remover este item do seu pedido?',
      [
        {
          text: 'Remover',
          onPress: () => {
            this.props.removeFromCart(id);
            this.setState({
              totalPrice: this.state.totalPrice - (price * qty),
            });
          },
        },
        {
          text: 'Cancelar', style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  }

  cartSentAlert() {
    Alert.alert(
      'Pedido Enviado com sucesso',
      'é para já que será servido',
      [
        {
          text: 'Ok',
          onPress: () => this.props.updateModal(false),
        },
      ],
      { cancelable: false }
    );
  }

  sendOrder() {
    const newCart = this.props.cart.map((item) => {
      const newItem = {};
      newItem.menuItem = item.id;
      newItem.quantity = item.qty;
      newItem.itemStatus = this.props.itemStatuses.filter(status => status.name.match('Pendente'))[0].id;
      return newItem;
    });
    api.bills.get(this.props.bill)
      .then((json) => {
        const mergedCart = [...newCart, ...json.menuItems];
        api.bills.patch(this.props.bill, { menuItems: mergedCart })
          .then(() => {
            this.props.resetCart();
            this.cartSentAlert();
          }, error => error);
      }, error => error)
      .catch(error => error);
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  renderItem(item) {
    return (
      <View style={styles.listContainer}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', height: 80 }}>
          <TouchableOpacity
            onPress={() => this.removeItem(item.id, item.qty, item.price)}
            style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderColor: '#7EAAAE', borderWidth: 1, marginLeft: 2 }}
            >
            <Text style={{ textAlign: 'center', fontFamily: 'daxline-extra-bold', fontSize: 20, color: '#7EAAAE' }}>X</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={styles.name}
          allowFontScaling={false}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <View style={styles.middleSection}>
          <TouchableOpacity
            style={styles.stepper}
            onPress={() => this.counterAdd(item.id, item.qty, item.price)}
            >
            <Text style={{ fontSize: 28 }}>
              +
            </Text>
          </TouchableOpacity>
          <Text
            style={styles.qty}
            allowFontScaling={false}
          >
            {item.qty}
          </Text>
          <TouchableOpacity
            style={styles.stepper}
            onPress={() => this.counterDecrease(item.id, item.qty, item.price)}
            >
            <Text style={{ fontSize: 32, paddingBottom: 12, }}>
              -
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={styles.price}
          allowFontScaling={false}
        >
          {item.price}
        </Text>
      </View>
    );
  }

  render() {
    if (this.props.cart.length < 1) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>
            MONTAGEM DO SEU PEDIDO
          </Text>
          <View style={styles.cart}>
            <Image
              source={require('../utils/emptyCart.png')}
              width={31}
              height={31}
            />
          </View>
          <Text style={styles.emptySubtitle}>
            Ops!
          </Text>
          <Text style={styles.emptyText}>
            Seu carrinho ainda está vazio.
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          MONTAGEM DO SEU PEDIDO
        </Text>
        <View style={styles.cart}>
          <Image
            source={require('../utils/cart.png')}
            width={31}
            height={31}
            />
        </View>
        <Text style={styles.firstText}>
          Antes de enviar seu pedido, é pra conferir se está tudo certinho.
        </Text>
        <FlatList
          style={styles.flatlist}
          data={this.props.cart}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReachedThreshold={50}
        />
        <View style={styles.firstSection}>
          <Text style={{ fontFamily: 'daxline-medium', fontSize: 16 }}>
            TOTAL PARCIAL
          </Text>
          <Text style={{ fontFamily: 'daxline-medium', fontSize: 16 }}>
            {this.state.totalPrice}
          </Text>
        </View>
        <View style={styles.secondSection}>
          <TouchableOpacity onPress={() => this.props.updateModal(false)}>
            <View style={styles.backButton}>
              <Image
                source={require('../utils/arrowFilled.png')}
                width={17}
                height={25}
                />
              <Text style={{ fontFamily: 'daxline-medium', color: 'white', fontSize: 15 }}>
                aqui é para pedir mais
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.sendOrder()}
            style={styles.sendButton}>
            <Text style={{ fontFamily: 'daxline-medium' }}>
              ENVIAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

AssemblyScreen.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemStatuses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  updateModal: PropTypes.func.isRequired,
  bill: PropTypes.string.isRequired,
  resetCart: PropTypes.func.isRequired,
};

const sectionStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EDEAE2',
    height: '100%',
  },
  firstSection: {
    height: 40,
    paddingHorizontal: 5,
    backgroundColor: '#95C3A6',
    marginVertical: 10,
    justifyContent: 'space-around',
    ...sectionStyle,
  },
  secondSection: {
    height: 60,
    justifyContent: 'space-between',
    ...sectionStyle,
  },
  separator: {
    height: 10,
    width: '100%',
  },
  emptyContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#EDEAE2',
  },
  emptySubtitle: {
    fontFamily: 'daxline-medium',
    marginTop: '30%',
    fontSize: 30,
    textAlign: 'center',
    color: '#7EAAAE',
  },
  emptyText: {
    fontFamily: 'daxline-regular',
    marginHorizontal: 10,
    textAlign: 'center',
    color: '#7EAAAE',
  },
  title: {
    fontFamily: 'daxline-medium',
    color: '#7EAAAE',
    marginTop: 12,
    fontSize: 15,
  },
  cart: {
    marginTop: 10,
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
  },
  rightSection: {
      width: '100%',
      alignItems: 'flex-end',
      paddingHorizontal: 30,
      marginTop: 10,
  },
  flatlist: {
    width: '100%',
    height: '40%',
    backgroundColor: '#EDEAE2',
  },
  firstText: {
    height: '10%',
    paddingTop: 10,
    paddingHorizontal: 30,
    fontFamily: 'daxline-regular',
    lineHeight: 17,
  },
  listContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    width: '100%',
    backgroundColor: 'white',
  },
  name: {
    fontFamily: 'daxline-medium',
    paddingLeft: 10,
    width: '50%'
  },
  middleSection: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    paddingRight: 10,
    width: '15%',
    fontFamily: 'daxline-medium',
    textAlign: 'center',
  },
  sendButton: {
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#7EAAAE',
    marginRight: 10,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 35,
    width: 200,
    backgroundColor: '#B0B19F',
  },
  stepper: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qty: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
  }
});

const mapStateToProps = state => (
  {
    cart: state.sessionReducer.cart,
    itemStatuses: state.sessionReducer.itemStatuses,
    billStatuses: state.sessionReducer.billStatuses,
    tableNumber: state.sessionReducer.tableNumber,
    businessID: state.sessionReducer.businessID,
    bill: state.sessionReducer.bill,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    removeFromCart: id => dispatch(removeFromCart(id)),
    updateCart: (id, qty) => dispatch(updateCart(id, qty)),
    updateBill: bill => dispatch(updateBill(bill)),
    updateModal: modalVisible => dispatch(updateModal(modalVisible)),
    updateSession: session => dispatch(updateSession(session)),
    resetCart: () => dispatch(resetCart()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AssemblyScreen);
