import { DrawerNavigator } from 'react-navigation';
import MenuScreen from './../screens/menu';
import DrawerContainer from '../components/drawer';

export default Drawer = DrawerNavigator({
  menuScreen: { screen: MenuScreen },
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer,
  drawerPosition: 'right',
});
