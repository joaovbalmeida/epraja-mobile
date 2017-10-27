import React, { Component } from 'react';;
import { Text,
		View,
		StyleSheet } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Category1 from '../components/category1.js';
import Category2 from '../components/category2.js';
import Category3 from '../components/category3.js';


export default class HomeScreen extends Component {

	render() {
		return (
			<ScrollableTabView >
				<Category1 tabLabel="Category 1" />
				<Category2 tabLabel="Category 2" />
				<Category3 tabLabel="Category 3" />
			</ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		width: '100%',
	},
});
