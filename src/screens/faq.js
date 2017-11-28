import React from 'react';
import { ScrollView, Text, View, TouchableHighlight, StyleSheet, KeyboardAvoidingView, TextInput, Keyboard, TouchableWithoutFeedback, Modal } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ScrollableText from '../components/scrollabletext';
import faqTexts from '../utils/faqtexts';

export default class FAQScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      modalVisible: false,
      modalTitle: '',
      modalText: ''
    };
  }

  setModalVisible(visible, title = '', text = '') {
    this.setState({
      modalTitle: title,
      modalText: text,
      modalVisible: visible
    });
  }

  render(){
    return(
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior="padding"
            >
            <View style={styles.container}>
              <View style={styles.top}>
                <View style={styles.blankView}>
                  <TouchableHighlight
                    onPress={() => this.props.navigation.dispatch(NavigationActions.back()) }>
                    <Text style={styles.closeButton}>&#10799;</Text>
                  </TouchableHighlight>
                </View>
                <Text style={styles.title}>
                  FALE CONOSCO
                </Text>
                <View style={styles.blankView}>
                </View>
              </View>
              <View style={styles.underTop}>
                <View>
                  <Text style={{marginBottom: 15}}>
                    AJUDA AO CLIENTE
                  </Text>
                  <Text style={styles.subtitles}>
                    PEDIDO:
                  </Text>
                  <TouchableHighlight
                    style={styles.touchableText}
                    onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.orderReview.title, faqTexts.orderReview.text)}>
                    <Text>COMO AVALIAR UM PEDIDO?</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.touchableText}
                    onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.orderLate.title, faqTexts.orderLate.text)}>
                    <Text>ESTÁ ATRASADO?</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.touchableText}
                    onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.orderMissing.title, faqTexts.orderMissing.text)}>
                    <Text>O PEDIDO CHEGOU ERRADO OU ESTÁ FALTANDO ITENS?</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.touchableText}
                    onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.cancellation.title, faqTexts.cancellation.text)}>
                    <Text>CANCELAMENTO</Text>
                  </TouchableHighlight>
                </View>
                <View>
                  <Text style={styles.subtitles}>
                    SOBRE O TAPSTER:
                  </Text>
                  <TouchableHighlight
                    style={styles.touchableText}
                    onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.tapsterJobs.title, faqTexts.tapsterJobs.text)}>
                    <Text>QUERO TRABALHAR NO TAPSTER</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.touchableText}
                    onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.howWorks.title, faqTexts.howWorks.text)}>
                    <Text>O QUE É? COMO FUNCIONA O TAPSTER?</Text>
                  </TouchableHighlight>
                </View>
                <View>
                  <Text style={{marginBottom: 10}}>MINHA DÚVIDA NÃO ESTÁ AQUI</Text>
                  <Text style={{marginBottom: 2}}>ENVIAR SOLICITAÇÃO</Text>
                  <TextInput
                    style={styles.textInput}
                    multiline={true}
                    returnKeyType={'done'}
                    />
                  <TouchableHighlight style={styles.bottom}>
                    <Text style={styles.bottomButton}>ENVIAR</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={styles.modal}>
            <View style={styles.top}>
              <View style={styles.blankView}>
                <TouchableHighlight
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                  <Text style={styles.closeButton}>&#10799;</Text>
                </TouchableHighlight>
              </View>
              <Text style={styles.title}>
                {this.state.modalTitle}
              </Text>
              <View style={styles.blankView}>
              </View>
            </View>
            <ScrollableText
              text={this.state.modalText}
              />
            <View style={styles.bottom}>
              <TouchableHighlight
                onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <Text style={styles.bottomButton}>SAIR</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
    height: '100%',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '10%',
  },
  underTop: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingTop: 10,
    height: '90%',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 30,
    marginRight: 20,
    marginBottom: 10,
  },
  modal: {
    marginTop: 30,
    paddingBottom: 50,
    height: '100%',
    width: '100%',
  },
  touchableText: {
    margin: 5,
    paddingVertical: 3,
  },
  subtitles: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    width: '60%',
    textAlign: 'center',
    color: 'red',
  },
  closeButton: {
    width: 30,
    fontSize: 30,
    paddingLeft: 10,
  },
  textInput: {
    fontSize: 14,
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 1,
    color: 'black',
  },
  bottomButton: {
    width: 50,
    fontSize: 16,
    marginTop: 15,
  },
  blankView: {
    width: 50,
  }
});
