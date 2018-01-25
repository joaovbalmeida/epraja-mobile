import React from 'react';
import { TouchableOpacity, Platform, Image } from 'react-native';
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
      <TouchableOpacity
        onPress={() => {
          if (navigation.state.index === 0) {
            navigation.navigate('DrawerOpen');
          } else {
            navigation.navigate('DrawerClose');
          }
        }}
        style={{ paddingRight: 20 }}
        >
        <Image
          source={require('../utils/gear.png')}
          style={{width: 36, height: 36}}
        />
      </TouchableOpacity>
    ),
  }),
});

export default MenuStack;
