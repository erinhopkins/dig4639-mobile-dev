import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Button, Card }  from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class ContactsScreen extends React.Component {
	state = {contactsList:[]}
	focusListener = undefined;
	constructor(props) {
		super(props)
		this.focusListener = props.navigation.addListener('focus',
			() => this.componentGainsFocus())
	}

updateContactsList() {
		fetch('http://plato.mrl.ai:8080/contacts', {
			headers: {
				"API": "hopkins"
			}
	})
		.then(res => res.json())
		.then(body => {
			console.log(body)
			this.setState({contactsList:body.contacts})
		})
	}

	componentGainsFocus() {
		console.log("Has focus")
		this.updateContactsList()
	}

	componentWillUnmount() {
		this.props.navigation.removeLisenter('focus', this.componentGainsFocus)
	}

	componentDidMount() {
		this.updateContactsList()
	}

	removeContact(position) {
		fetch('http://plato.mrl.ai:8080/contacts/remove', {
			method: "POST",
			headers: {
				"API": "hopkins",
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({position:position})
		})
		.then(res => res.json())
		.then(body => {
			console.log(body)
			if(body.removed != undefined) {
				const currentList = this.state.contactsList.filter((v,i) =>
					(i !== position))
				this.setState({contactsList: currentList})
			}
			// this.setState({todoList:body.todo})
		})
	}

  render() {
		return (
			<View style={styles.container}>
				<View>
					<Button
						title="Add Contact"
						onPress={() => this.props.navigation.navigate('Add')}
						buttonStyle={styles.button}>
					</Button>
				</View>
      <ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}>
				{this.state.contactsList.map((item, index) =>
			<View key={index} styles={styles.contactsView}>
				<Card
					style={styles.card}>
						<Text>{item.name}</Text>
						<Text>{item.number}</Text>
					<View style={{position: 'absolute', right:0}}>
						<Icon
								name='delete'
								type='material'
            		checked={item.completed}
            		onPress={() => this.removeContact(index)}
								/>
						</View>
				</Card>
			</View>
				)}
			</ScrollView>
    </View>
  	);
	}
}

ContactsScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
		padding: 10,
		backgroundColor: '#b2eee6',
  },
	priorityRow: {
			flex: 1,
			flexDirection: 'row',
			backgroundColor: '#fafafa',
		},
		button: {
			backgroundColor: '#28336b',
			marginTop: 20
	},
});
