import { StackNavigator } from 'react-navigation'
import LoginScreen from './../screens/login.js'

export default LoginStack = StackNavigator({
	login: {
		screen: LoginScreen,
	},
});
