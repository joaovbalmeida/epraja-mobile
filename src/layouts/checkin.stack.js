import React from 'react';
import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './../screens/login';
import CheckinDrawer from './checkin.drawer';

const CheckinStack = StackNavigator({
  checkinDrawer: { screen: CheckinDrawer },
  loginScreen: { screen: LoginScreen },
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: '#4C3E54' },
    gesturesEnabled: false,
    headerTintColor: 'white',
    headerRight: (
      <Text onPress={() => {
          if (navigation.state.index === 0) {
            navigation.navigate('DrawerOpen');
          } else {
            navigation.navigate('DrawerClose');
          }
        }}
      >
        Menu
      </Text>
    ),
  }),
});

export default CheckinStack;
