import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Input, Button } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { MonoText } from '../components/StyledText';

const radioProps = [
  {label: '1', value: 0 },
  {label: '2', value: 1 },
	{label: '3', value: 3 }
];

export default class AddTaskScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			submitDisabled: true,
			taskText: "",
			taskPriority: 0
		}
	}

	handleTextInput(text) {
		if(text.length > 0) {
			this.setState( {
				submitDisabled: false,
				taskText: text
			})
		} else {
			this.setState({submitDisabled:true})
			console.log(text)
		}
	}

	handleCreatedTask() {
		console.log("Added!")
		console.log(this.state.taskText, this.state.taskPriority)
				fetch('http://plato.mrl.ai:8080/todo/add', {
			method: "POST",
			headers: {
				"API": "hopkins",
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				text:this.state.taskText,
				priority:this.state.taskPriority
			})
		})
		.then(res => res.json())
		.then(body => {
			console.log(body)
			if(body.added != undefined) {
				console.log("Successfully added task!")
				this.props.navigation.navigate('Todo',
					{ task: { text: this.state.taskText, priority: this.state.taskPriority } })
			} else {
				console.log("Error adding task")
			}
			// this.setState({todoList:body.todo})
		})
	}

	handlePriorityInput() {

	}

	render() {
		return (
			<ScrollView
				style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Input
				placeholder="e.g. Complete Final Project for DIG4639"
				onChangeText={text => this.handleTextInput(text)} />
			<View style={styles.priorityRow}>
				<Text style={styles.labelText}>Priority:</Text>
				<RadioForm
						radio_props={radioProps}
						initial={0}
						formHorizontal={true}
						labelHorizontal={false}
						onPress={(value) => {this.setState({taskPriority:value})}}
					/>
			</View>
			<Button title="Create Task"
				disabled = {this.state.submitDisabled}
				onPress={() => this.handleCreatedTask()}/>
    	</ScrollView>
		);
	}
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
