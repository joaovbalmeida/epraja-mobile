import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateModal } from '../store/actions/action.session';
import OrderItem from '../components/orderitem';
import api from '../api';

class RequestScreen extends React.Component {
  static navigationOptions = {
    title: 'PEDIDOS JÁ ENVIADOS',
  };

  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      foodItems: [],
      beverageItems: [],
    };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }

  componentWillMount() {
    this.fetchItems();
  }

  getKey() {
    return this.keyCount += 1;
  }

  mountData(json) {
    let price = 0;
    const billItems = json.menuItems.filter(billItem => billItem.itemStatus.match(this.props.itemStatuses.find(item => item.name === 'Encaminhado').id));
    const newItems = billItems.map((arrayItem) => {
      const newItem = arrayItem;
      newItem.itemData = this.props.items.find(item => item._id === arrayItem.menuItem);
      price += newItem.quantity * newItem.itemData.price;
      return newItem;
    });
    const foodItems = newItems.filter(foodItem => foodItem.itemData.menuCategory.match(this.props.categories.find(item => item.name === 'Comidas').id));
    const beverageItems = newItems.filter(beverageItem => beverageItem.itemData.menuCategory.match(this.props.categories.find(item => item.name === 'Bebidas').id));
    this.setState({
      totalPrice: price,
      foodItems: foodItems || [],
      beverageItems: beverageItems || [],
    });
  }

  fetchItems() {
    api.bills.get(this.props.bill)
      .then(json => this.mountData(json))
      .catch(error => error);
  }

  renderItem(item) {
    return (
      <OrderItem
        countdown="15:00"
        qty={item.quantity}
        name={item.itemData.name}
        price={item.itemData.price}
      />
    );
  }

  render() {
    if (this.state.foodItems.length < 1 && this.state.beverageItems.length < 1) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            VOCÊ AINDA NAO TEM NENHUM PEDIDO ENVIADO
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.firstText}>
          <Text>
            EM BREVE VOCÊ SERÁ ATENDIDO
          </Text>
        </View>
        <SectionList
          keyExtractor={() => this.getKey()}
          style={styles.sectionList}
          renderItem={({ item }) => this.renderItem(item)}
          renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
          sections={[
            { data: this.state.foodItems, title: 'Comidas' },
            { data: this.state.beverageItems, title: 'Bebidas' },
          ]}
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
            title="INCLUIR NOVOS ITENS"
            containerViewStyle={styles.backButton}
            fontSize={14}
            onPress={() => this.props.updateModal(false)}
            allowFontScaling={false}
          />
        </View>
      </View>
    );
  }
}

RequestScreen.propTypes = {
  itemStatuses: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  bill: PropTypes.string.isRequired,
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
  sectionList: {
    width: '100%',
    height: '60%',
  },
  firstText: {
    height: '10%',
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  price: {
    paddingRight: 10,
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
    categories: state.sessionReducer.menuCategories,
    items: state.sessionReducer.menuItems,
    tableNumber: state.sessionReducer.tableNumber,
    businessID: state.sessionReducer.businessID,
    bill: state.sessionReducer.bill,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    updateModal: modalVisible => dispatch(updateModal(modalVisible)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen);
