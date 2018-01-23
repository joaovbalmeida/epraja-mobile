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
  navigationOptions: () => ({
    headerStyle: { backgroundColor: '#EDEAE2' },
    gesturesEnabled: true,
    headerTintColor: 'black',
  }),
});

export default OrderStack;
