import React from 'react';
import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import MenuDrawer from './menu.drawer';
import ItemScreen from '../screens/item';

const MenuStack = StackNavigator({
  menuDrawer: { screen: MenuDrawer },
  itemScreen: { screen: ItemScreen },
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: '#4C3E54', marginTop: Constants.statusBarHeight },
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

export default MenuStack;
