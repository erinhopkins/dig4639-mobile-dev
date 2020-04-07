import React from 'react';
import { StyleSheet, Text, View }  from 'react-native';
import { Button }  from 'react-native-elements';
import questions from './questions.json'

const TIME_LIMIT = 5
const TITLE_STATE = 0
const QUESTION_STATE = 1
// const FINAL_STATE = 2

class QuizQuestion extends React.Component {
	// state={}
  render() {
    return (
		<View style={styles.container}>
			<Text style={styles.text}>{this.props.question}</Text>
			{this.props.answers.map((v, i) =>
			<Button title={v.text} buttonStyle={styles.button} onPress={() => this.props.nextQuestion(v.correct)} key={i} ></Button>)}
		</View>
		)
  }
}

// Use parenthesis around return elements in order to include more than
class TitlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			score: 0,
      titleText: "Trivia Quiz",
			counter: 0,
			currentState: TITLE_STATE,
			currentQuestion: 0
    }
  	this.timeLimit = TIME_LIMIT;
  }

  nextQuestion(correct) {
		console.log("BUTTON PRESSED")
		if(correct) {
			this.setState({score: this.state.score + 1})
		}
		if(this.state.currentQuestion == questions.length - 1) {
			console.log("DONE")
		} else {
    clearInterval(this.timer)
		console.log(this.state.currentQuestion)
    this.setState({
      titleText: "You answered X",
      currentState: QUESTION_STATE,
			currentQuestion: this.state.currentQuestion + 1
    })
  }
}
  countdown() {
    console.log("Handling interval")
    console.log(this.state.counter)
    if(this.state.counter < this.timeLimit) {
      this.setState({
        titleText: 'Starting the Quiz',
        counter: this.state.counter + 1
      })
    } else {
      this.setState({
        titleText: "Beginning Quiz!",
        currentState: QUESTION_STATE,
        counter: 0
      })
    if(this.state.currentState == TITLE_STATE) {
				this.timer = setInterval(() => this.countdown(), 1000)
				clearInterval(this.timer)
			} else {
				this.setState({titleText: "You answered!"})
			}
		}
}

  start() {
    console.log("Starting!")
    this.setState({titleText: "Starting the Quiz!", counter: 0})
    this.timer = setInterval(() => this.countdown(), 1000)
}

  render() {
    return (
      <View style={styles.container}>
				<Text style={styles.timer}>{this.timeLimit - this.state.counter}</Text>
				{((this.state.currentState === TITLE_STATE) ?
				<>
				<Text style={styles.text}>{this.state.titleText}</Text>
				<Button buttonStyle={styles.button} title="Start" onPress={()=>this.start()}></Button>
				</>
				:
				<QuizQuestion answers={questions[this.state.currentQuestion].possibleAnswers} question={questions[this.state.currentQuestion].question} nextQuestion={(correct) => this.nextQuestion(correct)}></QuizQuestion>)}
				<Text style={styles.score}>Score: {this.state.score}</Text>
      </View>)
  }
}

function App() {
  return(
    <View style={styles.container}>
      <TitlePage></TitlePage>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
		backgroundColor: '#b2eee6',
  },

	text: {
		margin: 5,
		fontSize: 25
	},

	timer: {
		color: "#F97170",
		margin: 5,
		fontSize: 20
	},

	score: {
		color: "#385A7C",
		margin: 5,
		fontSize: 15
	},

  button: {
		width: 100,
		backgroundColor: "#385A7C",
		margin: 5
	}
});