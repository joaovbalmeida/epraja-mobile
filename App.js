import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNav from './src/layouts/main';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import sessionReducer from './src/store/reducers/reducer.session';
import { createLogger } from 'redux-logger'

const middlewares = [];

if (process.env.NODE_ENV === `development`) {

  middlewares.push(createLogger({
    collapsed: true
  }))
}

const store = compose(applyMiddleware(...middlewares))(createStore)(sessionReducer);

export default class App extends React.Component {
    render() {
    return (
      <Provider store={store}>
        <MainNav />
      </Provider>
    );
  }
}
