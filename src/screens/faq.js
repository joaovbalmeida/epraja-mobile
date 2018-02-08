import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Modal, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ScrollableText from '../components/scrollabletext';
import faqTexts from '../utils/faqtexts';

export default class FAQScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalTitle: '',
      modalText: '',
    };
  }

  setModalVisible(visible, title = '', text = '') {
    this.setState({
      modalTitle: title,
      modalText: text,
      modalVisible: visible,
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#EDEAE2' }}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
          <View style={styles.container}>
            <View style={styles.top}>
              <TouchableOpacity
                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../utils/x.png')}
                    />
                  <Text style={styles.closeButton}>fechar</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text
              style={styles.title}
              allowFontScaling={false}
              >
              FALE CONOSCO
            </Text>
            <View style={styles.underTop}>
              <View>
                <Text
                  style={styles.subtitles}
                  allowFontScaling={false}
                  >
                  &#65517; PEDIDO
                </Text>
                <TouchableOpacity
                  style={styles.touchableText}
                  onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.orderReview.title, faqTexts.orderReview.text)}
                  >
                  <Text
                    allowFontScaling={false}
                    style={styles.text}
                    >
                    &#9679; Como avaliar um pedido?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchableText}
                  onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.orderLate.title, faqTexts.orderLate.text)}
                  >
                  <Text
                    allowFontScaling={false}
                    style={styles.text}
                    >
                    &#9679; Está atrasado?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchableText}
                  onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.orderMissing.title, faqTexts.orderMissing.text)}
                  >
                  <Text
                    allowFontScaling={false}
                    style={styles.text}
                    >
                    &#9679; O pedido chegou errado ou está faltando itens?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchableText}
                  onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.cancellation.title, faqTexts.cancellation.text)}
                  >
                  <Text
                    allowFontScaling={false}
                    style={styles.text}
                    >
                    &#9679; Cancelamento
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={styles.subtitles}
                    allowFontScaling={false}
                    >
                    &#65517; SOBRE A
                  </Text>
                  <Text
                    style={{ paddingLeft: 6, color: '#7EAAAE', fontFamily: 'daxline-extra-bold', fontSize: 20 }}
                    allowFontScaling={false}
                    >
                    é pra já
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.touchableText}
                  onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.tapsterJobs.title, faqTexts.tapsterJobs.text)}
                  >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      allowFontScaling={false}
                      style={styles.text}
                      >
                      &#9679; Quero trabalhar na
                    </Text>
                    <Text
                      style={{ paddingLeft: 6, color: '#696950', fontFamily: 'daxline-extra-bold', fontSize: 17 }}
                      allowFontScaling={false}
                      >
                      é pra já
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchableText}
                  onPress={() => this.setModalVisible(!this.state.modalVisible, faqTexts.howWorks.title, faqTexts.howWorks.text)}
                  >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      allowFontScaling={false}
                      style={styles.text}
                      >
                      &#9679; O que é? E como funciona a
                    </Text>
                    <Text
                      style={{ paddingLeft: 6, color: '#696950', fontFamily: 'daxline-extra-bold', fontSize: 17 }}
                      allowFontScaling={false}
                      >
                      é pra já
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ paddingBottom: 20 }}>
                <Text
                  style={styles.subtitles}
                  allowFontScaling={false}
                  >
                  &#65517; TEM MAIS DÚVIDAS?
                </Text>
                <Text
                  style={styles.text}
                  allowFontScaling={false}
                  >
                  &#9679; Escreve ai embaixo que a gente tenta esclarecer:
                </Text>
                <TextInput
                  style={styles.textInput}
                  multiline
                  returnKeyType="done"
                  allowFontScaling={false}
                  numberOfLines={4}
                  />
                <TouchableOpacity style={styles.sendBottom}>
                  <Text
                    style={styles.sendButton}
                    allowFontScaling={false}
                    >
                    ENVIAR
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <KeyboardSpacer
              topSpacing={300}
              />
          </View>
        </TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => null}
        >
          <View style={styles.modal}>
            <View style={styles.modalTop}>
              <TouchableOpacity
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../utils/x.png')}
                    />
                  <Text style={styles.closeButton}>fechar</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text
              style={styles.modalTitle}
              allowFontScaling={false}
              >
              {this.state.modalTitle}
            </Text>
            <ScrollableText
              text={this.state.modalText}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

FAQScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
};

const top = {
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: 40,
  width: '100%',
  marginTop: 10,
  marginLeft: 10,
};

const title = {
  marginTop: 10,
  paddingHorizontal: 30,
  width: '100%',
  textAlign: 'center',
  fontSize: 18,
  color: '#7EAAAE',
  fontFamily: 'daxline-medium',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 50,
    height: '100%',
    width: '100%',
    backgroundColor: '#EDEAE2',
  },
  top: {
    flex: 1,
    ...top,
  },
  modalTop: {
    ...top,
  },
  underTop: {
    flex: 10,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingTop: 10,
    height: '90%',
  },
  modal: {
    paddingTop: 15,
    paddingBottom: 50,
    height: '100%',
    width: '100%',
    backgroundColor: '#EDEAE2',
  },
  touchableText: {
    paddingVertical: 3,
  },
  subtitles: {
    paddingTop: 10,
    marginBottom: 8,
    paddingLeft: 20,
    color: '#7EAAAE',
    fontFamily: 'daxline-medium',
    fontSize: 16,
  },
  title: {
    flex: 1,
    ...title,
  },
  modalTitle: {
    ...title,
  },
  text: {
    fontFamily: 'daxline-medium',
    paddingLeft: 30,
    marginVertical: 1,
    fontSize: 13,
    color: '#696950',
  },
  closeButton: {
    fontSize: 13,
    fontFamily: 'daxline-regular',
    color: '#423736',
  },
  sendButton: {
    marginTop: 8,
    color: '#7EAAAE',
    fontFamily: 'daxline-medium',
    fontSize: 16,
  },
  sendBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textInput: {
    fontSize: 14,
    height: 80,
    marginTop: 5,
    borderColor: '#7EAAAE',
    borderWidth: 1,
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'daxline-regular',
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 15,
  },
});
