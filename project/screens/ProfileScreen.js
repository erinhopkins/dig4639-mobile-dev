import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class ProfileScreen extends React.Component {
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
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome {this.state.	userName}!</Text>
				<Text style={styles.text}>You have {this.state.userNum} contacts</Text>
				<Button
					title="View Contacts"
					onPress={() => this.props.navigation.navigate('Contacts')}
					buttonStyle={styles.button}>
				</Button>
				<Button
						title="Add Contact"
						onPress={() => this.props.navigation.navigate('Add')}
						buttonStyle={styles.button}>
					</Button>
    		</View>
		);
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
		padding: 10,
		backgroundColor: '#b2eee6',
  },
	welcome: {
		fontSize: 25,
		fontWeight: 'bold',
		paddingTop: 10,
		textAlign: 'center'
	},
	text: {
		fontSize: 20,
		paddingTop: 5,
		paddingBottom: 10,
		textAlign: 'center'
	},
	button: {
			backgroundColor: '#28336b',
			marginTop: 15
	},
});
