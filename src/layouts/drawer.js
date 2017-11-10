import { DrawerNavigator } from 'react-navigation';
import HomeScreen from './../screens/home';
import DrawerContainer from '../components/drawer';

export default Drawer = DrawerNavigator({
	homeScreen: { screen: HomeScreen },
}, {
	gesturesEnabled: false,
  contentComponent: DrawerContainer,
  drawerPosition: 'right',
});
