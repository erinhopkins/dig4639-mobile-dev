import * as React from 'react';
import { Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

export default function TabBarLabel(props) {
  return (
    <Text
      size={30}
      style={[styles.tabBarLabel,
							props.focused ? styles.tabBarLabelActive: {}]}>
			{props.title}
    </Text>
  )
}

const styles = StyleSheet.create({
	tabBarLabel: {
		paddingBottom: 6,
		fontSize: 10,
		textAlign: 'center'
	},
	tabBarLabelActive: {
		color: Colors.tabIconSelected
	}
});