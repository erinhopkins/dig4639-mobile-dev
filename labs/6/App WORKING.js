import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'
import questions from './questions.json'

// Quiz Question
class QuizQuestion extends React.Component {
	render() {
		return (
			<View>
				<Text>{this.props.question + 1}</Text>
				<Text>{ questions[this.props.question].question }</Text>
				{ questions[this.props.question].possibleAnswers.map( ( answer, index ) => ( <Button title={answer.text} onPress={() => this.props.callback( answer.correct )} key={index}></Button> ) )}
			</View>
		)
	}
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: 0,
			score: 0,
			started: false,
			previousQuestion: {
				correct: null
			},
			showResult: false,
			complete: false
    }
		this.nextQuestion = this.nextQuestion.bind(this);
  }

	// Start Quiz Method
	startQuiz() {
		this.setState({
			started: true
		});
	}

	// Move To Next Question
	async nextQuestion( correct ) {
		this.setState({
			previousQuestion: {
				correct
			},
			showResult: true
		})

		await new Promise( resolve => setTimeout( resolve, 1000) );

		const currentQuestion = this.state.currentQuestion + 1;

		this.setState({
			score: correct ? this.state.score + 1 : this.state.score,
			currentQuestion,
			showResult: false,
			complete: ( currentQuestion === questions.length ) ? true : false
		});
	}

	// Show Results After Each Question
	showQuestionResult() {
		return this.state.previousQuestion.correct ?
		// If Correct
			(<View><Text>Correct!</Text></View>):

		// If Wrong
			(
				<View><Text>Wrong!</Text></View>
			)
	}


	// Final Quiz Resultsxdz
	showQuizResults() {
		return (
			<View>
				<Text>Congratulations</Text>
				<Text>You Got {this.state.score} / {questions.length} Correct</Text>
			</View>
		)
	}


	// App Load Page
	startPage() {
		return (
			<View >
				<Text>Start the Quiz</Text>
				<Button title="START" onPress={() => this.startQuiz()}></Button>
			</View>
		)
	}

  render () {
    if ( !this.state.started ) {
			return this.startPage();
		}

		else if ( this.state.complete ) {
			return this.showQuizResults();
		}

		else if ( this.state.showResult ) {
			return this.showQuestionResult();
		}

		else {

			return (
				<QuizQuestion question={this.state.currentQuestion} callback={this.nextQuestion}></QuizQuestion>
			)
		}
  }
}

const styles = StyleSheet.create({
  container: {
    
  },

	text: {
		textAlign: "center"
	},

	button: {
		color: "#90d9cb"
	}
});