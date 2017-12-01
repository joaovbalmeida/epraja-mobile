import React from 'react';
import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MenuDrawer from './menu.drawer';
import ItemScreen from '../screens/item';
import AssemblyScreen from '../screens/assembly';
import RequestScreen from '../screens/request';
import BillScreen from '../screens/bill';

const MenuStack = StackNavigator({
  menuDrawer: { screen: MenuDrawer },
  itemScreen: { screen: ItemScreen },
  assemblyScreen: { screen: AssemblyScreen },
  requestScreen: { screen: RequestScreen },
  billScreen: { screen: BillScreen },
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: '#4C3E54' },
    gesturesEnabled: true,
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
