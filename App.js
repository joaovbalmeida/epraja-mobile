import React from 'react';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Font } from 'expo';
import MainNav, { BypassCheckinNav } from './src/layouts/main';
import sessionReducer from './src/store/reducers/reducer.session';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = persistCombineReducers(config, { sessionReducer });

const middlewares = [];

middlewares.push(thunk);

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger({
    collapsed: false,
  }));
}

console.ignoredYellowBox = ['Setting a timer', 'Warning: Each child in', 'Warning: Can only update'];

const store = createStore(reducer, compose(applyMiddleware(...middlewares)));
const persistor = persistStore(store);
const route = [];
const state = store.getState();
if (state.sessionReducer.tableNumber) {
  route.push(<BypassCheckinNav />);
} else {
  route.push(<MainNav />);
}

class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'daxline-regular': require('./src/utils/DaxlineProRegular.ttf'),
      'daxline-medium': require('./src/utils/DaxlineProMedium.ttf'),
      'daxline-light': require('./src/utils/DaxlineProLight.ttf'),
      'daxline-extra-bold': require('./src/utils/DaxlineProExtraBold.ttf'),
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {route}
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
