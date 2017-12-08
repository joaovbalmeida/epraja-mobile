import React from 'react';
import { Text, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import LoginScreen from './../screens/login';
import CheckinDrawer from './checkin.drawer';

const CheckinStack = StackNavigator({
  checkinDrawer: { screen: CheckinDrawer },
  loginScreen: { screen: LoginScreen },
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: (Platform.OS === 'android' ? { backgroundColor: '#4C3E54', paddingTop: Constants.statusBarHeight, height: Constants.statusBarHeight + 56 } : { backgroundColor: '#4C3E54' }),
    gesturesEnabled: false,
    headerTintColor: 'white',
    headerRight: (
      <Text
        onPress={() => {
          if (navigation.state.index === 0) {
            navigation.navigate('DrawerOpen');
          } else {
            navigation.navigate('DrawerClose');
          }
        }}
        style={{
          fontSize: 16,
          marginRight: 10,
        }}
      >
        Menu
      </Text>
    ),
  }),
});

export default CheckinStack;
