import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Input, Button } from 'react-native-elements';
import { MonoText } from '../components/StyledText';

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
				onPress={() => this.handleCreatedContact()}/>
    	</ScrollView>
		);
	}
}


function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  labelText: {
		textAlignVertical: 'center',
		textAlign: 'center'
	},
	container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
	priorityRow: {
    flex: 1,
		flexDirection: 'row',
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
