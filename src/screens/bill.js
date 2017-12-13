import React from 'react';
import { View, Text, SectionList, StyleSheet, Modal, TouchableHighlight, TextInput, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { resetState, updateModal } from '../store/actions/action.session';
import OrderItem from '../components/orderitem';
import api from '../api';

class BillScreen extends React.Component {
  static navigationOptions = {
    title: 'CONTA',
  };

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

manageCheckBox(number) {
  let newCheckbox = this.state.checkbox
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

setModalVisible(visible) {
  this.setState({ modalVisible: visible });
}

componentWillMount() {
  this.fetchItems();
}

getKey() {
  return this.keyCount++;
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
  survey.surveyRate = this.props.rates.find((item) => {
    return item.name === this.state.checkboxLabels[this.state.checkbox.indexOf(true)]
  }).id;
  api.surveys.create(survey)
    .then((json) => {
    Alert.alert(
      'OBRIGADO',
      'Volte sempre.',
      [
        {text: 'Ok', onPress: () => {
          this.resetNavigation();
        }},
      ],
      { cancelable: false }
    );
  }, (error) => {
    Alert.alert(
      'ERRO',
      'Não foi possivel enviar a pesquisa.',
      [
        {text: 'Ok', onPress: () => {
          this.resetNavigation();
        }},
      ],
      { cancelable: false }
    );
  })
}

closeBill() {
  const status = this.props.billStatuses.find((item) => {
    return item.name === 'Fechada'
  }).id;
  api.bills.patch(this.props.bill, { billStatus: status })
    .then((json) => {
      this.setModalVisible(true);
    }, error => error);
}

mountData(json) {
  let price = 0;
  const billItems = json.menuItems.filter((billItem) => {
    return billItem.itemStatus.match(this.props.itemStatuses.find((item) => {
      return item.name === 'Entregue';
    }).id);
  });
  const newItems = billItems.map((arrayItem) => {
    const newItem = arrayItem;
    newItem.itemData = this.props.items.find((item) => {
      return item._id === arrayItem.menuItem;
    });
    price += newItem.quantity * newItem.itemData.price;
    return newItem;
  });
  const foodItems = newItems.filter((foodItem) => {
    return foodItem.itemData.menuCategory.match(this.props.categories.find((item) => {
      return item.name === 'Comidas';
    }).id);
  });
  const beverageItems = newItems.filter((beverageItem) => {
    return beverageItem.itemData.menuCategory.match(this.props.categories.find((item) => {
      return item.name === 'Bebidas';
    }).id);
  });
  this.setState({
    totalPrice: price,
    foodItems: foodItems || [],
    beverageItems: beverageItems || [],
  });
}

fetchItems() {
  api.bills.get(this.props.bill)
    .then(json => this.mountData(json), error => console.log(error))
    .catch(error => error);
}

renderItem(item) {
  return (
    <OrderItem
      countdown={'15:00'}
      qty={item.quantity}
      name={item.itemData.name}
      price={item.itemData.price}
      />
  );
}

render() {
  const finalPrice = "TOTAL DE: R$" + String(this.state.totalPrice);
  if (this.state.foodItems.length < 1 && this.state.beverageItems.length < 1) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          VOCÊ AINDA NAO TEM NENHUM PEDIDO EM SUA CONTA
        </Text>
      </View>
    )
  }
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.firstText}>
          <Text>
            PEDIDOS JÁ ENTREGUES
          </Text>
        </View>
        <SectionList
          keyExtractor={item => this.getKey()}
          style={styles.sectionList}
          renderItem={({ item }) => this.renderItem(item)}
          renderSectionHeader={({section}) => <Text>{section.title}</Text>}
          sections={[
            {data: this.state.foodItems, title: 'Comidas'},
            {data: this.state.beverageItems, title: 'Bebidas'},
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
            fontSize={12}
            onPress={() => this.props.updateModal(false)}
            allowFontScaling={false}
            />
          <Button
            title="FECHAR CONTA"
            containerViewStyle={styles.sendButton}
            onPress={() => this.closeBill()}
            fontSize={12}
            allowFontScaling={false}
            />
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
              <Text style={{fontSize: 16,}}>
                AGUARDE SUA CONTA NA MESA PARA QUE SEJA FEITO O PAGAMENTO
              </Text>
              <View style={{alignItems: 'flex-end', width: '100%'}}>
                <Text>
                  TOTAL DE: R$ {this.state.totalPrice}
                </Text>
              </View>
              <Text>
                Dê sua opinião para nosso app:
              </Text>
              <CheckBox
                title='Insatisfeito'
                checked={this.state.checkbox[0]}
                containerStyle={styles.checkbox}
                onPress={() => this.manageCheckBox(0)}
                />
              <CheckBox
                title='Pode melhorar'
                checked={this.state.checkbox[1]}
                containerStyle={styles.checkbox}
                onPress={() => this.manageCheckBox(1)}
                />
              <CheckBox
                title='Satisfeito'
                checked={this.state.checkbox[2]}
                containerStyle={styles.checkbox}
                onPress={() => this.manageCheckBox(2)}
                />
              <CheckBox
                title='Muito satisfeito'
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
                multiline={true}
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
  sendButton: {
    height: 30,
    width: 120,
  },
  backButton: {
    height: 30,
    width: 170,
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
    resetState: active => dispatch(resetState()),
    updateModal: modalVisible => dispatch(updateModal(modalVisible)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(BillScreen);
