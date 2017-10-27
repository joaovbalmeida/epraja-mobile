import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class DrawerContainer extends React.Component {

	logout = () => {
		const actionToDispatch = NavigationActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
		});
		this.props.navigation.dispatch(actionToDispatch);
	}

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Text
					onPress={() => navigation.navigate('homeScreen')}
					style={styles.drawerItem}>
					Screen 1
				</Text>
				<Text

					style={styles.drawerItem}>
					Screen 2
				</Text>
				<Text

					style={styles.drawerItem}>
					Screen 3
				</Text>
				<Text
					onPress={this.logout}>
					Log Out
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f6',
		paddingTop: 40,
		paddingHorizontal: 20
	},
	drawerItem: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#E73536',
		padding: 15,
		margin: 5,
		borderRadius: 2,
		borderColor: '#E73536',
		borderWidth: 1,
		textAlign: 'center'
	}
});
