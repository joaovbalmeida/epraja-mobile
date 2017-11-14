import { DrawerNavigator } from 'react-navigation';
import CheckinScreen from './../screens/checkin';
import DrawerContainer from '../components/drawer';

export default CheckinDrawer = DrawerNavigator({
  checkinScreen: { screen: CheckinScreen },
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer,
  drawerPosition: 'right',
});
