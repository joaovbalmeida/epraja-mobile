import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements'
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
          style={styles.button}
          color="black"
          height={30}
          width={50}
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
        >
          <View style={styles.modal}>
            <View style={styles.top}>
              <View style={styles.blankView}>
                <TouchableHighlight
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                  <Text style={styles.closeButton}>&#10799;</Text>
                </TouchableHighlight>
              </View>
              <Text style={styles.modalTitle}>
                TERMOS DE USO
              </Text>
              <View style={styles.blankView} />
            </View>
            <ScrollableText
              text={faqTexts.termsOfUse.text}
            />
            <View style={styles.bottom}>
              <TouchableHighlight
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Text style={styles.bottomButton}>SAIR</Text>
              </TouchableHighlight>
            </View>
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
  },
  modal: {
    marginTop: 30,
    paddingBottom: 50,
    height: '100%',
    width: '100%',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    width: '100%',
    marginTop: 10,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 30,
    marginRight: 20,
    paddingTop: 10,
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
    width: 50,
    fontSize: 18,
  },
  blankView: {
    width: 50,
  },
});
