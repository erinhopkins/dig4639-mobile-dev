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
			userName: '',
			userNum: ''
		}
	}

	componentDidMount() {
		fetch('http://plato.mrl.ai:8080/profile', {
			headers: {
				"API": 'hopkins',
			}
		})
			.then(res => res.json())
			.then(body => {
				this.setState({ userName: body.name, userNum: body.count })
			})
	}


	render() {
		return (
			<ScrollView>
				<Text>Welcome {this.state.userName}!</Text>
				<Text>You have {this.state.userNum} contacts</Text>
			<Button
				title="View Contacts"
				onPress={() => this.props.navigation.navigate('Contacts')}>
			</Button>
			<Button
					title="Add Contact"
					onPress={() => this.props.navigation.navigate('Add')}>
				</Button>
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
