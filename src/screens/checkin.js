import React, { Component } from 'react';
import { View,
        Text,
        StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class CheckinScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
              <Text
                onPress={() => this.props.navigation.navigate('loginScreen')}
                style={styles.drawerItem}>
                entrar
              </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'blue'
    },
});
