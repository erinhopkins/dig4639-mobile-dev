import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Questions from 'components/questions.json'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			questions: [],
			current: 0,
			correctScore: 5,
			
		}
	}


render() {
	return (
			<View style={styles.container}>
				<Text>App 6</Text>
			</View>
		);
	}
}
  




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
