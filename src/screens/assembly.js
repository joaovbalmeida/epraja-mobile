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
      subTitle: 'Ops!',
      message: 'Seu carrinho ainda está vazio.',
    };
  }

  counterAdd(item) {
    this.props.updateCart(item.id, item.qty + 1, item.comment);
    this.setState({
      totalPrice: this.state.totalPrice + item.price,
    });
  }

  counterDecrease(item) {
    if (item.qty > 1) {
      this.props.updateCart(item.id, item.qty - 1, item.comment);
      this.setState({
        totalPrice: this.state.totalPrice - item.price,
      });
    }
  }

  removeItem(item) {
    console.log()
    this.props.removeFromCart(item.id, item.comment);
    this.setState({
      totalPrice: this.state.totalPrice - (item.price * item.qty),
    });
  }

  cartSentMessage() {
    this.setState({
      subTitle: 'Seu pedido foi enviado com sucesso!',
      message: 'é para já que será servido.',
    });
  }

  sendOrder() {
    const cart = this.props.cart;
    const newCart = [];
    for (i = 0; i < cart.length ; i++) {
      if (cart[i].qty > 1) {
         for (k = 0; k < cart[i].qty; k++) {
           const newItem = {
             menuItem: cart[i].id,
             itemStatus: this.props.itemStatuses.filter(status => status.name.match('Pendente'))[0].id,
             comment: cart[i].comment,
           };
           newCart.push(newItem);
         }
      } else {
        const newItem = {
          menuItem: cart[i].id,
          itemStatus: this.props.itemStatuses.filter(status => status.name.match('Pendente'))[0].id,
          comment: cart[i].comment,
        };
        newCart.push(newItem);
      }
    }
    api.bills.get(this.props.bill)
      .then((json) => {
        const mergedCart = [...newCart, ...json.menuItems];
        api.bills.patch(this.props.bill, { menuItems: mergedCart })
          .then(() => {
            this.props.resetCart();
            this.cartSentMessage();
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
        <View style={{ justifyContent: 'center', alignItems: 'flex-start', height: 80 }}>
          <TouchableOpacity
            onPress={() => {
              this.removeItem(item);
            }}
            style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}
          >
            <Text style={{ textAlign: 'center', fontFamily: 'daxline-extra-bold', fontSize: 20, color: '#7EAAAE' }}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', width: '50%', height: '100%', justifyContent: 'center' }}>
          <Text
            style={styles.name}
            allowFontScaling={false}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text
            style={styles.comment}
            allowFontScaling={false}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {item.comment}
          </Text>
        </View>
        <View style={styles.middleSection}>
          <TouchableOpacity
            style={styles.stepper}
            onPress={() => this.counterAdd(item)}
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
            onPress={() => this.counterDecrease(item)}
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
          R$ {item.price}
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
            {this.state.subTitle}
          </Text>
          <Text style={styles.emptyText}>
            {this.state.message}
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
    paddingHorizontal: 20,
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
  },
  comment: {
    fontFamily: 'daxline-medium',
    fontSize: 12,
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
    backgroundColor: 'transparent',
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
    removeFromCart: (id, comment) => dispatch(removeFromCart(id, comment)),
    updateCart: (id, qty, comment) => dispatch(updateCart(id, qty, comment)),
    updateBill: bill => dispatch(updateBill(bill)),
    updateModal: modalVisible => dispatch(updateModal(modalVisible)),
    updateSession: session => dispatch(updateSession(session)),
    resetCart: () => dispatch(resetCart()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AssemblyScreen);
