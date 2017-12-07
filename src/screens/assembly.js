import React from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart, updateCart, updateModal, resetCart, updateBill } from '../store/actions/action.session';
import api from '../api';

class AssemblyScreen extends React.Component {
  static navigationOptions = {
    title: 'MONTAGEM DO PEDIDO',
  };

  constructor(props) {
    super(props);
    var price = 0;
    this.props.cart.forEach(item => price += (item.qty * item.price))
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
        {text: 'Remover', onPress: () => {
          this.props.removeFromCart(id);
          this.setState({
            totalPrice: this.state.totalPrice - (price * qty),
          });
        }},
        {text: 'Cancelar', style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  cartSentAlert() {
    Alert.alert(
      'Pedido Enviado',
      'Aguarde que você ja será servido.',
      [
        {text: 'Ok', onPress: () => this.props.updateModal(false)},
      ],
      { cancelable: false }
    )
  }

  sendOrder() {
    const newCart = this.props.cart.map(item => {
      const newItem = {};
      newItem.menuItem = item.id;
      newItem.quantity = item.qty;
      newItem.itemStatus = this.props.itemStatuses.filter(item => item.name.match('Pendente'))[0].id;
      return newItem;
    });
    if (this.props.bill === '') {
      const bill = {};
      bill.table = this.props.tableNumber;
      bill.billStatus = this.props.billStatuses.filter(item => item.name.match('Aberta'))[0].id;
      bill.business = this.props.businessID;
      bill.menuItems = newCart;
      api.bills.create(bill)
        .then((json) => {
        this.props.updateBill(json._id);
        this.props.resetCart();
        this.cartSentAlert();
      }, error => error)
        .catch(error => error);
    } else {
      api.bills.get(this.props.bill)
        .then((json) => {
          const mergedCart = [ ...newCart, ...json.menuItems ]
          api.bills.patch(this.props.bill, { menuItems: mergedCart })
            .then((json) => {
              console.log(json)
              this.props.resetCart();
              this.cartSentAlert();
            }, error => error);
        }, error => error)
        .catch(error => error);
    }
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  renderItem(item) {
    return (
      <View style={styles.listContainer}>
        <Button
          title="X"
          buttonStyle={styles.stepper}
          onPress={() => this.removeItem(item.id, item.qty, item.price)}
        />
        <Text style={styles.name}>
          {item.name}
        </Text>
        <View style={styles.middleSection}>
          <Button
            title="+"
            buttonStyle={styles.stepper}
            onPress={() => this.counterAdd(item.id, item.qty, item.price)}
            />
          <Text style={styles.qty}>
            {item.qty}
          </Text>
          <Button
            title="-"
            buttonStyle={styles.stepper}
            onPress={() => this.counterDecrease(item.id, item.qty, item.price)}
            />
        </View>
        <Text style={styles.price}>
          {item.price}
        </Text>
      </View>
    );
  }

  render() {
    if (this.props.cart.length < 1) {
      return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {this.state.emptyMessage}
        </Text>
      </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.firstText}>
          CONFIRA SUA LISTA DE PEDIDOS ANTES DE ENVIÁ-LA
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
          <Text>
            TOTAL PARCIAL
          </Text>
          <Text>
            {this.state.totalPrice}
          </Text>
        </View>
        <View style={styles.secondSection}>
          <Button
            title="INCLUIR MAIS ITENS"
            containerViewStyle={styles.backButton}
            fontSize={14}
            onPress={() => this.props.updateModal(false)}
          />
          <Button
            title="ENVIAR"
            containerViewStyle={styles.sendButton}
            onPress={() => this.sendOrder()}
          />
        </View>
      </View>
    );
  }
}

AssemblyScreen.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableNumber: PropTypes.number.isRequired,
  itemStatuses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  updateModal: PropTypes.func.isRequired,
};

const sectionStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  firstSection: {
    height: '10%',
    paddingHorizontal: 5,
    ...sectionStyle,
  },
  secondSection: {
    height: '20%',
    ...sectionStyle,
  },
  separator: {
    height: 5,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '400',
    margin: 20,
    textAlign: 'center',
  },
  flatlist: {
    width: '100%',
    height: '60%',
  },
  firstText: {
    height: '10%',
    paddingTop: 5,
  },
  listContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    width: '100%',
    borderColor: '#000000',
    borderWidth: 1,
  },
  name: {
    paddingLeft: 10,
  },
  middleSection: {
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    paddingRight: 10,
  },
  sendButton: {
    height: 30,
    width: 80,
  },
  backButton: {
    height: 30,
    width: 200,
  },
  stepper: {
    height: 40,
    width: 40,
  },
  qty: {
    fontSize: 18,
  },
});

const mapStateToProps = state => (
  {
    cart: state.sessionReducer.cart,
    itemStatuses: state.sessionReducer.itemStatuses,
    billStatuses: state.sessionReducer.billStatuses,
    tableNumber: state.sessionReducer.tableNumber,
    businessID: state.sessionReducer.businessID,
    bill: state.sessionReducer.bill
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    removeFromCart: id => dispatch(removeFromCart(id)),
    updateCart: (id, qty) => dispatch(updateCart(id, qty)),
    updateBill: (bill) => dispatch(updateBill(bill)),
    updateModal: modalVisible => dispatch(updateModal(modalVisible)),
    resetCart: () => dispatch(resetCart()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AssemblyScreen);
