import React, { Component } from 'react';
//import { connect } from 'react-redux'
import { Text,
		View,
		StyleSheet } from 'react-native'

export default class HomeScreen extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Text>Olá seja bem vindo</Text>
			</View>
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

/*const mapStateToProps = state => {
	return {
		number: state.number
	};
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch,
		updateNumber: (number) => dispatch(updateTableNumber(number))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);*/
