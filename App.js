import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/layouts/login.js'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import sessionReducer from './src/store/reducers/reducer.session'

let store = createStore(sessionReducer)

export default class App extends React.Component {
	constructor(props){
		super(props)
		alert(store.getState());
	}
	
  	render() {
		return (
			<Provider store={store}>
				<Login />
			</Provider>
		);
	}
}
