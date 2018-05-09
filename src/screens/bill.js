import React from 'react';
import { View, Text, SectionList, StyleSheet, Modal, TouchableHighlight, TextInput, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
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
      checkbox: [false, false, false],
      checkboxLabels: ['Muito satisfeito', 'Satisfeito', 'Pode melhorar'],
      textInput: '',
      endSession: false,
      billClosed: false,
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

  manageCheckBox(number) {
    const newCheckbox = this.state.checkbox;
    for (i = 0; i < 3; i++) {
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

  endSession() {
    this.setState({ endSession: true })
    const survey = {};
    survey.business = this.props.businessID;
    survey.detail = this.state.textInput;
    if (this.state.checkbox.indexOf(true) > -1) {
      survey.surveyRate = this.props.rates.find(item => item.name === this.state.checkboxLabels[this.state.checkbox.indexOf(true)]).id;
    } else {
      survey.surveyRate = this.props.rates[0];
    }
    api.surveys.create(survey)
      .then(() => {
        this.setState({ endSession: false, billClosed: true });
        setTimeout(() => {
          this.setState({ modalVisible: false });
          this.props.updateModal(false);
          this.props.resetState();
        }, 3000);
      }, () => {
        this.setState({ endSession: false, billClosed: true });
        setTimeout(() => {
          this.setState({ modalVisible: false });
          this.props.updateModal(false);
          this.props.resetState();
        }, 3000);
      });
  }

  closeBill() {
    const status = this.props.billStatuses.find(item => item.name === 'Fechada').id;
    api.bills.patch(this.props.bill, { billStatus: status })
      .then(() => this.setState({ modalVisible: true }));
  }

  mountData(json) {
    let price = 0;
    const billItems = json.menuItems.filter(billItem => billItem.itemStatus.match(this.props.itemStatuses.find(item => item.name === 'Entregue').id));
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

  renderSectionHead(section) {
    if (section.title === 'Comidas'){
      return (
        <View>
          <View style={{ height: 15, backgroundColor: '#EDEAE2' }}></View>
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EDEAE2' }}>
            <Text style={{ color: '#231F1F', fontFamily: 'daxline-medium', paddingLeft: 30 }}>
              {section.title}
            </Text>
            <Text style={{ color: '#231F1F', fontFamily: 'daxline-medium', paddingRight: 30 }} />
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <View style={{ height: 20, backgroundColor: '#EDEAE2' }}></View>
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EDEAE2' }}>
            <Text style={{ color: '#231F1F', fontFamily: 'daxline-medium', paddingLeft: 30 }}>
              {section.title}
            </Text>
            <Text style={{ color: '#231F1F', fontFamily: 'daxline-medium', paddingRight: 30 }} />
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
          {
            !this.state.billClosed ?
              <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <View style={styles.modal}>
                  <TouchableOpacity
                    onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                    style={{ marginTop: 20 }}
                    >
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
                  <Text style={styles.modalTitle}>
                    CONTA FECHADA
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    é para já que sua conta vai chegar na sua mesa.
                  </Text>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: 30, backgroundColor: '#95C3A6', marginVertical: 8 }}>
                    <Text style={{ fontFamily: 'daxline-medium', fontSize: 17, backgroundColor: 'transparent' }}>
                      TOTAL DE: R$ {this.state.totalPrice}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'daxline-medium', color: '#7EAAAE', fontSize: 17, width: '100%', paddingHorizontal: 30 }}>
                    O que achou do é para ja?
                  </Text>
                  <Text style={{ fontFamily: 'daxline-medium', color: '#7EAAAE', width: '100%', paddingHorizontal: 30, marginBottom: 5 }}>
                    É para dar sua opinião. A gente quer cuidar cada vez melhor do seu pedido:
                  </Text>
                  <View style={{ flex: 5, width: '100%', justifyContent: 'center', paddingHorizontal: 30, backgroundColor: '#B9C8C5' }}>
                    <CheckBox
                      title="Muito Satisfeito"
                      checked={this.state.checkbox[0]}
                      containerStyle={styles.checkbox}
                      fontFamily="daxline-regular"
                      uncheckedColor="black"
                      onPress={() => this.manageCheckBox(0)}
                      />
                    <CheckBox
                      title="Satisfeito"
                      checked={this.state.checkbox[1]}
                      containerStyle={styles.checkbox}
                      fontFamily="daxline-regular"
                      uncheckedColor="black"
                      onPress={() => this.manageCheckBox(1)}
                      />
                    <CheckBox
                      title="Pode melhorar"
                      checked={this.state.checkbox[2]}
                      containerStyle={styles.checkbox}
                      fontFamily="daxline-regular"
                      uncheckedColor="black"
                      onPress={() => this.manageCheckBox(2)}
                      />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    multiline
                    returnKeyType="done"
                    onChangeText={text => this.setState({ textInput: text })}
                    placeholder="Pode deixar suas considerações por aqui também."
                    allowFontScaling={false}
                    numberOfLines={10}
                    />
                  <KeyboardSpacer
                    topSpacing={-50}
                  />
                  <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity
                      onPress={() => this.endSession()}
                      style={styles.bottomButton}
                      disabled={this.state.endSession}>
                      <Text style={{ fontFamily: 'daxline-medium' }}>
                        ENVIAR
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback> :
              <View style={{ backgroundColor: '#2D327F', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../utils/logo2.png')}
                  width={194}
                  height={60}
                />
                <Text style={styles.emptySubtitle}>
                  Obrigada!
                </Text>
                <Text style={styles.emptyText}>
                  é para já que a gente se vê de novo ;-)
                </Text>
              </View>
          }
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
  modal: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#EDEAE2',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'daxline-medium',
    color: '#7EAAAE',
    width: '100%',
    textAlign: 'center',
  },
  modalSubtitle: {
    flex: 2,
    fontSize: 16,
    fontFamily: 'daxline-regular',
    color: '#7EAAAE',
    marginTop: 5,
    width: '100%',
    paddingHorizontal: 30,
    textAlign: 'left',
  },
  closeButton: {
    width: 30,
    fontSize: 30,
  },
  bottomButton: {
    width: 90,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#7EAAAE',
    marginRight: 20,
    marginBottom: 20,
  },
  blankView: {
    width: 50,
  },
  checkbox: {
    flex: 1,
    width: 200,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  textInput: {
    height: 60,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 1,
    color: 'black',
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: '10%',
    paddingHorizontal: 15,
    fontFamily: 'daxline-regular',
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 17,
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
