import React from 'react';
import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DrawerStack from './drawer.stack';

const DrawerNav = StackNavigator({
	drawerStack: { screen: DrawerStack }
}, {
	headerMode: 'float',
	navigationOptions: ({navigation}) => ({
		headerStyle: {backgroundColor: '#4C3E54'},
		title: 'Home',
		gesturesEnabled: false,
		headerTintColor: 'white',
		headerLeft: <Text onPress={() => {
			if (navigation.state.index === 0) {
				navigation.navigate('DrawerOpen')
			} else {
				navigation.navigate('DrawerClose')
			}
		}}>Menu</Text>,
	})
});

export default DrawerNav;
