import React from 'react';
<<<<<<< HEAD
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
=======
import { StyleSheet, Text, View, Button, ListView, TextInput, CheckBox } from 'react-native';

class TodoItem extends React.Component {
  state={}
  render() {
    return <View style={{ flexDirection:'row' }}>
      <CheckBox style={{marginTop:12}} value={this.state.checked} onValueChange={() => this.setState({ checked: !this.state.checked })}></CheckBox>
    <Text style={{fontSize:30, marginLeft: 10}}>{this.props.content}</Text>
    </View>
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.rows = ['This is 1', 'This is 2', 'This is 3']
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      content: "Hello World",
      dataSource: ds.cloneWithRows(this.rows),
      currentItem: 3,
      todoText: ""
  }
    // console.log("Hello World!!!")
  } 

  onPressHandler(evt) {
    console.log("Clicked!!")
    this.rows = [...this.rows, this.state.todoText]
    console.log(this.state.todoText)
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this.rows)})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <TextInput onChangeText={todoText => this.setState({todoText})} ></TextInput>
          <Button style={styles.button} color="#990000" title="Click Me" onPress={(evt) => this.onPressHandler(evt)}></Button>
        </View>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <TodoItem content={rowData} />}
      />
      </View>
    );
  }
>>>>>>> 85308e767b6d679b23adec243374a9d10fde4199
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
