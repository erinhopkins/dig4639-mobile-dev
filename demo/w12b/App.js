import React from 'react';
import { StyleSheet, Text, View, Button, ListView } from 'react-native';
import { getCurrentFrame } from 'expo/build/AR';

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.rows = ['This is 1', 'This is 2', 'This is 3']
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			content: "Hello world",
			dataSource: ds.cloneWithRows(this.rows),
			currentItem: 3
	}
		// console.log("Hello world!!!")
	}

	onPressHandler(evt) {
		console.log("Clicked!!")
		this.setState({content: "Hello React Native blah"})
		// this.rows.push('New data to be added')
		// console.log("this.rows")
		this.rows = [...this.rows, 'New Array Item']
		this.setState({dataSource: this.state.dataSource.cloneWithRows(this.rows)})
	}

	render() {
		return (
				<View style={styles.container}>
					<Text style={styles.header}>{this.state.content}</Text>
					<Button style={styles.button} color="#90D9CB" title="Click Me" onPress={(evt) => this.onPressHandler(evt)}></Button>
					 <ListView
        		dataSource={this.state.dataSource}
        		renderRow={(rowData) => <View><Button title="Complete"></ Button>
						<Text key={rowData.id}>{rowData}</Text></View>}
      />
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
	button: {

	}
});
