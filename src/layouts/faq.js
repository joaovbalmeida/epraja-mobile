import React from 'react';
import { StackNavigator } from 'react-navigation';
import FAQScreen from '../screens/faq';

export default FAQStack = StackNavigator({
  faqScreen: { screen: FAQScreen },
},{
  headerMode: 'none',
  title: 'FAQ',
  mode: 'modal'
});
