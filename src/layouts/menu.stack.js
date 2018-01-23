import React from 'react';
import { Text, Platform } from 'react-native';
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
    headerStyle: (Platform.OS === 'android' ? { backgroundColor: '#EDEAE2', paddingTop: Constants.statusBarHeight, height: Constants.statusBarHeight + 56 } : { backgroundColor: '#EDEAE2' }),
    gesturesEnabled: false,
    headerTintColor: 'black',
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
