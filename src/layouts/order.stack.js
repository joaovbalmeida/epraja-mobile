import { StackNavigator } from 'react-navigation';
import AssemblyScreen from '../screens/assembly';
import OrderScreen from '../screens/order';
import RequestScreen from '../screens/request';
import BillScreen from '../screens/bill';

const OrderStack = StackNavigator({
  orderScreen: { screen: OrderScreen },
  assemblyScreen: { screen: AssemblyScreen },
  requestScreen: { screen: RequestScreen },
  billScreen: { screen: BillScreen },
}, {
  headerMode: 'screen',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: '#4C3E54' },
    gesturesEnabled: true,
    headerTintColor: 'white',
  }),
});

export default OrderStack;
