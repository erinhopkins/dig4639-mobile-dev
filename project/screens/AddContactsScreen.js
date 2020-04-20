import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button } from 'react-native-elements';

export default class AddContactsScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			submitDisabled: true,
			taskText: "",
			taskPriority: 0
		}
	}

	handleNameInput(text) {
		if(text.length > 0) {
			this.setState( {
				submitDisabled: false,
				contactName: text
			})
		} else {
			this.setState({submitDisabled:true})
			console.log(text)
		}
	}

		handleNumberInput(text) {
		if(this.state.contactName.length > 0 && text.length > 0) {
			this.setState({
				submitDisabled: false,
				contactNumber: text
			})
		} else {
			this.setState({submitDisabled:true})
			console.log(text)
		}
	}

	handleCreatedContact() {
		console.log("Added!")
		console.log(this.state.contactName, this.state.contactNumber)
				fetch('http://plato.mrl.ai:8080/contacts/add', {
			method: "POST",
			headers: {
				"API": "hopkins",
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				name:this.state.contactName,
				number:this.state.contactNumber
			})
		})
		.then(res => res.json())
		.then(body => {
			console.log(body)
			if(body.added != undefined) {
				console.log("Successfully added contact!")
				this.props.navigation.navigate('Contacts',
					{ contact: { name: this.state.contactName, number: this.state.contactNumber } })
			} else {
				console.log("Error adding contact")
			}
			// this.setState({todoList:body.todo})
		})
	}

	handlePriorityInput() {

	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<Text>Name:</Text>
					<Input
						placeholder="John Doe"
						onChangeText={text => this.handleNameInput(text)}>
					</Input>
					<Text>Number:</Text>
					<Input
						placeholder="123-456-7890"
						onChangeText={text => this.handleNumberInput(text)}>
					</Input>
				<Button title="Add Contact"
					disabled = {this.state.submitDisabled}
					onPress={() => this.handleCreatedContact()}
					buttonStyle={styles.button}>
				</Button>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
		padding: 10,
		backgroundColor: '#b2eee6'
  },

	button: {
    backgroundColor: '#28336b',
		marginTop: 20
	}

});
