
import { Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CheckinStack from './checkin.stack';
import DrawerStack from './drawer.stack';

const noTransitionConfig = () => ({
	transitionSpec: {
		duration: 0,
		timing: Animated.timing,
		easing: Easing.step0
	}
});

const MainNav = StackNavigator({
  checkinStack: { screen: CheckinStack },
  drawerStack: { screen: DrawerStack }
}, {
	headerMode: 'none',
	title: 'Main',
  initialRouteName: 'checkinStack',
	transitionConfig: noTransitionConfig
});

export default MainNav;
