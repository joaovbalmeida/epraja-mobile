
import { Animated, Easing } from 'react-native'
import { StackNavigator } from 'react-navigation'
import LoginStack from './login'
import DrawerNav from './drawer.nav'

const noTransitionConfig = () => ({
	transitionSpec: {
		duration: 0,
		timing: Animated.timing,
		easing: Easing.step0
	}
})

const MainNav = StackNavigator({
	loginStack: { screen: LoginStack },
	drawerStack: { screen: DrawerNav }
}, {
	headerMode: 'none',
	title: 'Main',
	initialRouteName: 'loginStack',
	transitionConfig: noTransitionConfig
})

export default MainNav
