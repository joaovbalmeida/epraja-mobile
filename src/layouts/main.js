import { Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CheckinStack from './checkin.stack';
import MenuStack from './menu.stack';
import FAQStack from './faq.stack';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});

export const BypassCheckinNav = StackNavigator({
  checkinStack: { screen: CheckinStack },
  menuStack: { screen: MenuStack },
  faqStack: { screen: FAQStack },
}, {
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'menuStack',
  transitionConfig: noTransitionConfig,
});

const MainNav = StackNavigator({
  checkinStack: { screen: CheckinStack },
  menuStack: { screen: MenuStack },
  faqStack: { screen: FAQStack },
}, {
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'checkinStack',
  transitionConfig: noTransitionConfig,
});

export default MainNav;
