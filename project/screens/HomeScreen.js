import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { MonoText } from '../components/StyledText';


//API parameters
const HEADERS = {
	"method": "GET",
	"headers": {
		"api": "hopkins",
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
}
// Functional component (cannot use state)
export default function HomeScreen() {
	const [contacts, setContacts] = React.useState([]);
	const { promiseInProgress } = usePromiseTracker();
	const callApi = React.useCallback(() => {
		fetch('http://plato.mrl.ai:8080/', HEADERS)
			.then(response => response.json())
			.then(body => console.log(body))
	}, [])
React.useEffect(() => {
	console.log("Effect has run")
	trackPromise(fetch('http://plato.mrl.ai:8080/contacts', HEADERS)
		.then(response => response.json())
		.then(body => setContacts(body.contacts)))
}, [])
  return (
    <View style={styles.container}>
			<Button
				buttonStyle={styles.button}
				onPress={callApi}
  			title="Call the API"
  			accessibilityLabel="Calls the remote API for contacts">
			</Button>

			{ (promiseInProgress) ?
				<ActivityIndicator size="large" color="90d9cb"/>
				: contacts.map((contact, i) => <Card key={i} title={contact.name}/>)
			}
    </View>
  );
}

// Class component
// export default class HomeScreen extends React.Component {
// 	state = {
// 		contacts:[]
// 	}
// 	callApi =  () => {
// 		fetch('http://plato.mrl.ai:8080/', HEADERS)
// 			.then(response => response.json())
// 			.then(body => console.log(body))
// 	}

// 	componentDidMount() {
// 		console.log("Effect has run")
// 		trackPromise(fetch('http://plato.mrl.ai:8080/contacts', HEADERS)
// 			.then(response => response.json())
// 			.then(body => this.setState({contacts:body.contacts})))
// 	}

// 	render () {
// 		return(
//     <View style={styles.container}>
// 			<Button
// 				onPress={this.callApi}
//   			title="Call the API"
//   			color="#841584"
//   			accessibilityLabel="Calls the remote API for contacts"
// 			/>

// 			{ (promiseInProgress) ?
// 				<ActivityIndicator size="large" color="90d9cb"/>
// 				: this.state.contacts.map((contact, i) => <Card key={i} title={contact.name}/>)
// 			}
//     </View>
//   	);
// 	}
// }


HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}


// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

	button: {
  	width: 100,
		backgroundColor: "#385A7C",
		margin: 5
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
