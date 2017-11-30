import { StackNavigator } from 'react-navigation';
import FAQScreen from '../screens/faq';

const FAQStack = StackNavigator({
  faqScreen: { screen: FAQScreen },
}, {
  headerMode: 'none',
  title: 'FAQ',
  mode: 'modal',
});

export default FAQStack;
