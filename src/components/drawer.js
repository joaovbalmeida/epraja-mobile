import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { RectangleButton } from 'react-native-button-component';

export default class DrawerContainer extends React.Component {

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <RectangleButton
          title="Entrar"
          onPress={() => this.props.navigation.navigate('drawerStack')}
          style={styles.button}
          color="black"
          height={25}
          width={50}
          />
        <Text
        onPress={() => navigation.navigate('homeScreen')}
        style={styles.drawerItem}>
          FALE CONOSCO
        </Text>
        <Text
        style={styles.drawerItem}>
          TERMOS DE USO
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20
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
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'white',
 },
});
