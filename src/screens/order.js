import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { PropTypes } from 'prop-types';
import { updateModal } from '../store/actions/action.session';

class OrderScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.top}>
          <TouchableHighlight
            onPress={() => this.props.updateModal(false)}
          >
            <Text style={styles.closeButton}>&#10799;</Text>
          </TouchableHighlight>
          <View>
            <Text style={styles.closeButton}>&#128651;</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <Button
            title="MONTAGEM DO SEU PEDIDO"
            onPress={() => this.props.navigation.navigate('assemblyScreen')}
          />
          <Button
            title="PEDIDOS PENDENTES"
            onPress={() => this.props.navigation.navigate('requestScreen')}
          />
          <Button
            title="CONTA"
            onPress={() => this.props.navigation.navigate('billScreen')}
          />
        </View>
      </View>
    );
  }
}

OrderScreen.propTypes = {
  updateModal: PropTypes.func.isRequired,
  navigation: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginTop: 30,
    paddingBottom: 50,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  bottom: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    height: '50%',
    marginHorizontal: 30,
    paddingVertical: 20,
  },
  closeButton: {
    width: 30,
    fontSize: 30,
  },
});

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    updateModal: modalVisible => dispatch(updateModal(modalVisible)),
  }
);

export default connect(null, mapDispatchToProps)(OrderScreen);
