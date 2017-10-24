import React from 'react';
import { Text, View, ImageBackground, StyleSheet, KeyboardAvoidingView, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { RectangleButton } from 'react-native-button-component'

export default class LoginScreen extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			tableNumber: 0,
		};
	}
	
	onPress(){
		alert(`${this.state.tableNumber}`)
	}
	
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
							<TextInput
								placeholder="Table Number"
								value={this.state.tableNumber.toString()}
								style={styles.textInput}
								keyboardType='numeric'
								onChangeText={(tableNumber) => this.setState({ tableNumber })}
								/>
							<RectangleButton
								title="Entrar"
								onPress={this.onPress.bind(this)}
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
