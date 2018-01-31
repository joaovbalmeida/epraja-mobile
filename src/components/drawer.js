import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
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
        <Button
          title="EN"
          onPress={() => navigation.navigate('drawerStack')}
          buttonStyle={styles.button}
          color="black"
          allowFontScaling={false}
        />
        <Text
          onPress={() => navigation.navigate('faqStack')}
          style={styles.drawerItem}
        >
          FALE CONOSCO
        </Text>
        <Text
          onPress={() => this.setModalVisible(true)}
          style={styles.drawerItem}
        >
          TERMOS DE USO
        </Text>
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
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  drawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    marginBottom: 20,
    marginLeft: 5,
    height: 30,
    width: 50,
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
