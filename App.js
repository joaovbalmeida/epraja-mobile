import React from 'react';
import MainNav from './src/layouts/main';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/es/integration/react'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { persistCombineReducers, persistStore } from 'redux-persist';
import sessionReducer from './src/store/reducers/reducer.session';
import { AsyncStorage } from 'react-native';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = persistCombineReducers(config, { sessionReducer });

const middlewares = [];

middlewares.push(thunk)

if (process.env.NODE_ENV === `development`) {
  middlewares.push(createLogger({
    collapsed: true
  }));
}

const store = createStore(
  reducer,
  compose(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainNav />
        </PersistGate>
      </Provider>
    );
  }
}
