import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import ScrollableText from './scrollabletext';
import faqTexts from '../utils/faqtexts';

export default class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'daxline-medium', color: '#7EAAAE', fontSize: 18 }}>
            CONFIGURAÇÕES
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingVertical: '20%' }}>
          <Text style={{ fontFamily: 'daxline-medium', color: '#423736', fontSize: 16 }}>
            Trocar Idioma
          </Text>
          <TouchableOpacity
            style={styles.button}
            >
            <Text style={{ fontFamily: 'daxline-regular', color: '#423736', fontSize: 16 }}>
              E N
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('faqStack')}
          style={styles.drawerItem}
        >
          <Text style={styles.buttonText}>
            FALE CONOSCO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setModalVisible(true)}
          style={styles.drawerItem}
        >
          <Text style={styles.buttonText}>
            TERMOS DE USO
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => null}
        >
          <View style={styles.modal}>
            <View style={styles.top}>
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
            <Text style={styles.modalTitle}>
              TERMOS DE USO
            </Text>
            <ScrollableText
              text={faqTexts.termsOfUse.text}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE2',
    paddingTop: 25,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  drawerItem: {
    backgroundColor: '#7EAAAE',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    height: 30,
    width: 130,
  },
  buttonText: {
    fontFamily: 'daxline-medium',
    color: 'white',
    fontSize: 13,
    textAlign: 'center'
  },
  button: {
    borderRadius: 2,
    borderColor: '#423736',
    borderWidth: 1,
    height: 35,
    width: 35,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    paddingTop: 15,
    paddingBottom: 50,
    height: '100%',
    width: '100%',
    backgroundColor: '#EDEAE2',
  },
  top: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 40,
    width: '100%',
    marginTop: 10,
    marginLeft: 10,
  },
  modalTitle: {
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    color: '#7EAAAE',
    fontFamily: 'daxline-medium',
  },
  closeButton: {
    fontSize: 13,
    fontFamily: 'daxline-regular',
    color: '#423736',
  },
  blankView: {
    width: 50,
  },
});
