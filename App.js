import React from 'react';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import MainNav from './src/layouts/main';
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

const store = createStore(reducer, compose(applyMiddleware(...middlewares)));
const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MainNav />
    </PersistGate>
  </Provider>
);

export default App;
