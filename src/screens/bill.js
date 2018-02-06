import React from 'react';
import { View, Text, SectionList, StyleSheet, Modal, TouchableHighlight, TextInput, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity, Image } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetState, updateModal } from '../store/actions/action.session';
import api from '../api';

class BillScreen extends React.Component {
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
      modalVisible: false,
      checkbox: [false, false, false, false],
      checkboxLabels: ['Insatisfeito', 'Pode melhorar', 'Satisfeito', 'Muito satisfeito'],
      textInput: '',
    };
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
  }

  componentWillMount() {
    this.fetchItems();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  getKey() {
    return this.keyCount += 1;
  }

  manageCheckBox(number) {
    const newCheckbox = this.state.checkbox;
    for (i = 0; i < 4; i++) {
      if (i === number) {
        newCheckbox[i] = true;
      } else {
        newCheckbox[i] = false;
      }
    }
    this.setState({
      checkbox: newCheckbox,
    });
  }

  resetNavigation() {
    this.setModalVisible(false);
    this.props.updateModal(false);
    this.props.resetState();
  }

  endSession() {
    const survey = {};
    survey.business = this.props.businessID;
    survey.detail = this.state.textInput;
    survey.surveyRate = this.props.rates.find(item => item.name === this.state.checkboxLabels[this.state.checkbox.indexOf(true)]).id;
    api.surveys.create(survey)
      .then(() => {
        Alert.alert(
          'OBRIGADO',
          'Volte sempre.',
          [
            { text: 'Ok', onPress: () => this.resetNavigation() },
          ],
          { cancelable: false }
        );
      }, () => {
        Alert.alert(
          'ERRO',
          'Não foi possivel enviar a pesquisa.',
          [
            { text: 'Ok', onPress: () => this.resetNavigation() },
          ],
          { cancelable: false }
        );
      });
  }

  closeBill() {
    const status = this.props.billStatuses.find(item => item.name === 'Fechada').id;
    api.bills.patch(this.props.bill, { billStatus: status })
      .then(() => this.setModalVisible(true));
  }

  mountData(json) {
    let price = 0;
    const billItems = json.menuItems.filter(billItem => billItem.itemStatus.match(this.props.itemStatuses.find(item => item.name === 'Entregue').id));
    const newItems = [];
    billItems.forEach((arrayItem) => {
      const newItem = arrayItem;
      newItem.itemData = this.props.items.find(item => item._id === arrayItem.menuItem);
      if (newItem.quantity > 1){
        for (i = 0; i < newItem.quantity; i++) {
          newItems.push(newItem);
        }
      } else {
        newItems.push(newItem);
      }
      price += newItem.quantity * newItem.itemData.price;
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

  renderSectionHead(section) {
    if (section.title === 'Comidas'){
      return (
        <View>
          <View style={{ height: 15 }}></View>
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#231F1F', fontFamily: 'daxline-medium', paddingLeft: 30 }}>
              {section.title}
            </Text>
            <Text style={{ color: '#231F1F', fontFamily: 'daxline-medium', paddingRight: 30 }}>
              Hora que você pediu: 14:20
            </Text>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <View style={{ height: 20 }}></View>
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#231F1F', fontFamily: 'daxline-medium', paddingLeft: 30 }}>
              {section.title}
            </Text>
            <Text style={{ color: '#231F1F', fontFamily: 'daxline-medium', paddingRight: 30 }}>
              Hora que você pediu: 14:20
            </Text>
          </View>
        </View>
      )
    }
  }

  renderItem(item, section) {
    if (section.title === 'Comidas'){
      return (
        <View>
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor: 'white' }}>
            <Text style={{ fontFamily: 'daxline-medium', paddingLeft: 30 }}>
              {item.itemData.name}
            </Text>
            <Text style={{ fontFamily: 'daxline-medium', paddingRight: 30 }}>
              {item.itemData.price}
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
              {item.itemData.price}
            </Text>
          </View>
        </View>
      );
    }
  }

  render() {
    if (this.state.foodItems.length < 1 && this.state.beverageItems.length < 1) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>
            CONTA
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
            Sua conta ainda está vazia.
          </Text>
        </View>
      );
    }
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>
            CONTA
          </Text>
          <View style={styles.cart}>
            <Image
              source={require('../utils/cart.png')}
              width={31}
              height={31}
              />
          </View>
          <Text style={styles.firstText}>
            PEDIDOS JÁ ENTREGUES
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
              onPress={() => this.closeBill()}
              style={styles.sendButton}>
              <Text style={{ fontFamily: 'daxline-medium' }}>
                FECHAR CONTA
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => null}
        >
          <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <KeyboardAvoidingView
              style={styles.modal}
              behavior="position"
              keyboardVerticalOffset={-600}
            >
              <View style={styles.top}>
                <View style={styles.blankView}>
                  <TouchableHighlight
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
                  >
                    <Text style={styles.closeButton}>&#10799;</Text>
                  </TouchableHighlight>
                </View>
                <Text style={styles.modalTitle}>
                  CONTA FECHADA
                </Text>
                <View style={styles.blankView} />
              </View>
              <View style={styles.center}>
                <Text style={{ fontSize: 16 }}>
                  AGUARDE SUA CONTA NA MESA PARA QUE SEJA FEITO O PAGAMENTO
                </Text>
                <View style={{ alignItems: 'flex-end', width: '100%' }}>
                  <Text>
                    TOTAL DE: R$ {this.state.totalPrice}
                  </Text>
                </View>
                <Text>
                  Dê sua opinião para nosso app:
                </Text>
                <CheckBox
                  title="Insatisfeito"
                  checked={this.state.checkbox[0]}
                  containerStyle={styles.checkbox}
                  onPress={() => this.manageCheckBox(0)}
                />
                <CheckBox
                  title="Pode melhorar"
                  checked={this.state.checkbox[1]}
                  containerStyle={styles.checkbox}
                  onPress={() => this.manageCheckBox(1)}
                />
                <CheckBox
                  title="Satisfeito"
                  checked={this.state.checkbox[2]}
                  containerStyle={styles.checkbox}
                  onPress={() => this.manageCheckBox(2)}
                />
                <CheckBox
                  title="Muito satisfeito"
                  checked={this.state.checkbox[3]}
                  containerStyle={styles.checkbox}
                  onPress={() => this.manageCheckBox(3)}
                />
              </View>
              <View style={styles.bottom}>
                <Text>
                  OBS:
                </Text>
                <TextInput
                  style={styles.textInput}
                  multiline
                  returnKeyType="done"
                  onChangeText={text => this.setState({ textInput: text })}
                />
                <Button
                  buttonStyle={styles.bottomButton}
                  onPress={() => this.endSession()}
                  title="ENVIAR"
                  allowFontScaling={false}
                />
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

BillScreen.propTypes = {
  billStatuses: PropTypes.arrayOf(PropTypes.object).isRequired,
  rates: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemStatuses: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateModal: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  businessID: PropTypes.string.isRequired,
  bill: PropTypes.string.isRequired,
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
    height: '60%',
  },
  firstText: {
    height: '10%',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 30,
    fontFamily: 'daxline-regular',
    textAlign: 'left',
    lineHeight: 18,
    fontSize: 17,
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
  sendButton: {
    height: 35,
    width: 120,
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
    height: 40,
    width: 40,
  },
  qty: {
    fontSize: 18,
  },
  modal: {
    height: '100%',
    width: '100%',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '15%',
    width: '100%',
  },
  center: {
    height: '65%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '15%',
    paddingTop: 30,
    marginHorizontal: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: 'red',
  },
  closeButton: {
    width: 30,
    fontSize: 30,
  },
  bottomButton: {
    width: 90,
  },
  blankView: {
    width: 50,
  },
  checkbox: {
    width: 200,
  },
  textInput: {
    fontSize: 14,
    height: 60,
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 1,
    color: 'black',
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => (
  {
    businessID: state.sessionReducer.businessID,
    itemStatuses: state.sessionReducer.itemStatuses,
    rates: state.sessionReducer.rates,
    billStatuses: state.sessionReducer.billStatuses,
    categories: state.sessionReducer.menuCategories,
    items: state.sessionReducer.menuItems,
    bill: state.sessionReducer.bill,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    resetState: () => dispatch(resetState()),
    updateModal: modalVisible => dispatch(updateModal(modalVisible)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(BillScreen);
