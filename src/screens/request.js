import React from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateModal } from '../store/actions/action.session';
import api from '../api';

class RequestScreen extends React.Component {
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

  getItemStatusesName(id) {
    const result = this.props.itemStatuses.filter(i => i.id === id);

    return result.length ? result[0].name : {};
  }

  mountData(json) {
    let price = 0;
    const billItems = json.menuItems.filter(billItem => {
      return (
        !billItem.canceled
        &&
        (this.getItemStatusesName(billItem.itemStatus) === 'Encaminhado'
        ||
        this.getItemStatusesName(billItem.itemStatus) === 'Pendente')
      );
    });
    const newItems = [];
    billItems.forEach((arrayItem) => {
      const newItem = arrayItem;
      newItem.itemData = this.props.items.find(item => item._id === arrayItem.menuItem);
      newItems.push(newItem);
      price += newItem.itemData.price;
    });
    const foodItems = newItems.filter(foodItem => foodItem.itemData.menuCategory.match(this.props.categories.find(item => item.name === 'é para Comer').id));
    const beverageItems = newItems.filter(beverageItem => beverageItem.itemData.menuCategory.match(this.props.categories.find(item => item.name === 'é para Beber').id));
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

  renderItem(item, section) {
    if (section.title === 'Comidas') {
      return (
        <View>
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor: 'white' }}>
            <Text style={{ fontFamily: 'daxline-medium', paddingLeft: 30 }}>
              {item.itemData.name}
            </Text>
            <Text style={{ fontFamily: 'daxline-medium', paddingRight: 30 }}>
              R$ {item.itemData.price}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor: '#B9C8C5' }}>
            <Text style={{ fontFamily: 'daxline-medium', paddingLeft: 30 }}>
              {item.itemData.name}
            </Text>
            <Text style={{ fontFamily: 'daxline-medium', paddingRight: 30 }}>
              R$ {item.itemData.price}
            </Text>
          </View>
        </View>
      );
    }
  }

  renderSectionHead(section) {
    if (section.title === 'Comidas'){
      return (
        <View>
          <View style={{ height: 15, backgroundColor: '#EDEAE2' }}></View>
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor: 'white' }}>
            <Text style={{ width: '30%', color: '#231F1F', fontFamily: 'daxline-medium', paddingLeft: 30 }}>
              {section.title}
            </Text>
            <Text style={{ width: '30%', color: '#231F1F', fontFamily: 'daxline-medium', paddingRight: 30 }}>

            </Text>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <View style={{ height: 20, backgroundColor: '#EDEAE2' }}></View>
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#B9C8C5' }}>
            <Text style={{ width: '30%', color: '#231F1F', fontFamily: 'daxline-medium', paddingLeft: 30 }}>
              {section.title}
            </Text>
            <Text style={{ width: '30%', color: '#231F1F', fontFamily: 'daxline-medium', paddingRight: 30 }} />
          </View>
        </View>
      )
    }
  }

  render() {
    if (this.state.foodItems.length < 1 && this.state.beverageItems.length < 1) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>
            PEDIDOS JÁ ENVIADOS
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
            Nenhum pedido está pendente.
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          PEDIDOS JÁ ENVIADOS
        </Text>
        <View style={styles.cart}>
          <Image
            source={require('../utils/cart.png')}
            width={31}
            height={31}
            />
        </View>
        <Text style={styles.firstText}>
          Seu pedido foi enviado com sucesso.{'\n'}
          é para já que você será servido.
        </Text>
        <SectionList
          keyExtractor={() => this.getKey()}
          style={styles.sectionList}
          renderItem={({ item, index, section }) => this.renderItem(item, section)}
          renderSectionHeader={({ section }) => this.renderSectionHead(section)}
          sections={[
            { data: this.state.foodItems, title: 'Comidas' },
            { data: this.state.beverageItems, title: 'Bebidas' },
          ]}
        />
        <View style={styles.firstSection}>
          <Text style={{ fontFamily: 'daxline-medium', fontSize: 16 }}>
            TOTAL PARCIAL
          </Text>
          <Text style={{ fontFamily: 'daxline-medium', fontSize: 16 }}>
            R$ {this.state.totalPrice}
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
              <Text style={{ fontFamily: 'daxline-medium', color: 'white', fontSize: 14 }}>
                aqui é para pedir mais
              </Text>
            </View>
          </TouchableOpacity>
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
  alignItems: 'center',
  width: '100%',
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EDEAE2',
    height: '100%'
  },
  firstSection: {
    height: 40,
    paddingHorizontal: 5,
    backgroundColor: '#95C3A6',
    marginVertical: 5,
    justifyContent: 'space-around',
    ...sectionStyle,
  },
  secondSection: {
    height: 60,
    justifyContent: 'space-between',
    ...sectionStyle,
  },
  separator: {
    height: 5,
    width: '100%',
    backgroundColor: '#FFFFFF',
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
    marginTop: 20,
    fontSize: 15,
  },
  cart: {
    marginTop: 15,
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
  },
  sectionList: {
    width: '100%',
    height: '45%',
  },
  firstText: {
    height: '10%',
    paddingTop: 10,
    paddingHorizontal: 30,
    fontFamily: 'daxline-regular',
    lineHeight: 18,
    fontSize: 17,
  },
  name: {
    paddingLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 35,
    width: 200,
    backgroundColor: '#B0B19F',
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
