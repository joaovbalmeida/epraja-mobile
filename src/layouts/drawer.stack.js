import React from 'react';
import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from './drawer';

const DrawerStack = StackNavigator({
  drawerStack: { screen: Drawer },
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: '#4C3E54' },
    title: 'Home',
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

export default DrawerStack;
