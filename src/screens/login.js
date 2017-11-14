import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text,
		 View,
		 ImageBackground,
		 StyleSheet,
		 KeyboardAvoidingView,
		 TextInput,
		 Button,
		 TouchableWithoutFeedback,
		 Keyboard } from 'react-native';
import { RectangleButton } from 'react-native-button-component';
import { updateTableNumber } from '../store/actions/action.session';

export class LoginScreen extends Component {

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground 
					style={styles.image}>
					<TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
						<KeyboardAvoidingView
							behavior="padding"
							style={styles.content}
							keyboardVerticalOffset={150}
							>
							<Text>{this.props.number}</Text>
							<TextInput
								placeholder="Table Number"
								style={styles.textInput}
								keyboardType='numeric'
								onChangeText={(number) => {this.props.updateNumber({number}); }}
								/>
							<RectangleButton
								title="Entrar"
								onPress={() => this.props.navigation.navigate('drawerStack')}
								style={styles.button}
								color="black"
								/>
						</KeyboardAvoidingView>
					</TouchableWithoutFeedback>
				</ImageBackground>
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
	image: {
		width: '100%',
		height: '100%',
		backgroundColor: 'lightblue',
	},
	content: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 25,
	},
	textInput: {
		minWidth: 250,
		paddingRight: 20,
		paddingLeft: 20,
		borderColor: 'black',
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 5,
		color: 'black',
	},
	button: {
		backgroundColor: 'white',
		minWidth: 250,
	},
});

const mapStateToProps = state => {
	return {
		number: state.number
	};
};

const mapDispatchToProps = dispatch => {
	return {
		dispatch,
		updateNumber: (number) => dispatch(updateTableNumber(number))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
