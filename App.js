import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNav from './src/layouts/main';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import sessionReducer from './src/store/reducers/reducer.session';

let store = createStore(sessionReducer);

export default class App extends React.Component {
  	render() {
		return (
			<Provider store={store}>
				<MainNav />
			</Provider>
		);
	}
}
