import { DrawerNavigator } from 'react-navigation';
import DrawerContainer from '../components/drawer';
import MenuScreen from '../screens/menu';

const MenuDrawer = DrawerNavigator({
  menuScreen: { screen: MenuScreen },
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer,
  drawerPosition: 'right',
});

export default MenuDrawer;
