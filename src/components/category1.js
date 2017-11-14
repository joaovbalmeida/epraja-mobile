import React, { Component } from 'react';
import { Text,
		View,
		StyleSheet } from 'react-native';

export default class Category1 extends Component {

	render() {
		return (
			<Text>
				Olá seja bem vindo
			</Text>
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
