import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ContactsScreen from '../screens/ContactsScreen';
import AddContactsScreen from '../screens/AddContactsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabBarLabel from  '../components/TabBarLabel'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Contacts';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          title: 'Contacts',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-contact"/>,
					tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} title={'Contacts'}/>
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={AddContactsScreen}
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-add" />,
					tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} title={'Add'}/>
        }}
      />
			<BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
					tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} title={'Profile'}/>
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Contacts':
      return 'Contacts List';
    case 'Add':
      return 'Add Contact';
	 case 'Profile':
      return 'View Profile';
  }
}
