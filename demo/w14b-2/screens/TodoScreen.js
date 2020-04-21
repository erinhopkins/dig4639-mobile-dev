import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { CheckBox, Button, Card }  from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class TodoScreen extends React.Component {
	state = {todoList:[]}
	focusListener = undefined;
	constructor(props) {
		super(props)
		this.focusListener = props.navigation.addListener('focus',
			() => this.componentGainsFocus())
	}

	updateTaskList() {
		fetch('http://plato.mrl.ai:8080/todo', {
			headers: {
				"API": "hopkins"
			}
	})
		.then(res => res.json())
		.then(body => {
			console.log(body)
			this.setState({todoList:body.todo})
		})
	}

	componentGainsFocus() {
		console.log("Has focus")
		this.updateTaskList()
	}

	componentWillUnmount() {
		this.props.navigation.removeLisenter('focus', this.componentGainsFocus)
	}

	componentDidMount() {
		this.updateTaskList()
	}

	removeTask(position) {
		fetch('http://plato.mrl.ai:8080/todo/remove', {
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
				const currentList = this.state.todoList.filter((v,i) =>
					(i !== position))
				this.setState({todoList: currentList})
			}
			// this.setState({todoList:body.todo})
		})
	}

	//Implement completing the task on the server
	completeTask(position, state) {
		fetch('http://plato.mrl.ai:8080/todo/setState', {
			method: "POST",
			headers: {
				"API": "hopkins",
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({position:position, status:true})
		})
		.then(res => res.json())
		.then(body => {
			console.log(body)
			if(body.updated != undefined) {
				const currentList = [...this.state.todoList]
				currentList[position].completed = state
				this.setState({todoList: currentList})
			}
			// this.setState({todoList:body.todo})
		})
	}

  render() {
		return (
			<View style={styles.container}>
      <ScrollView
				style={styles.container} contentContainerStyle={styles.contentContainer}>
				{this.state.todoList.map((item, index) =>
				<View key={index} style={styles.todoView}>
						<CheckBox
            		checked={item.completed}
            		onPress={() => this.completeTask(index, !item.completed)}/>
					<Text>{item.text} {item.completed}</Text>
					<View style={{position: 'absolute', right:0}}>
						<Button title="X" onPress={() => this.removeTask(index)}></Button>
					</View>
				</View>
				)}
				<Button
					title="Add Task"
					onPress={() => this.props.navigation.navigate('Add')}>
				</Button>
      </ScrollView>
    </View>
  	);
	}
}

TodoScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
	todoView: {
    flex: 1,
		flexDirection: 'row',
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
