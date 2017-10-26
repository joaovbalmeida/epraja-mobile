import { DrawerNavigator } from 'react-navigation'
import HomeScreen from './../screens/home'
import Drawer from '../components/drawer'

const DrawerStack = DrawerNavigator({
	homeScreen: { screen: HomeScreen },
}, {
	gesturesEnabled: false,
	contentComponent: Drawer
})

export default DrawerStack
