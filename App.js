
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {StackNavigator} from 'react-navigation';

//import screens
import Home from './components/Home';
import Traffic from './components/Traffic';
import AndroidToolbar from './components/AndroidToolbar';

export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    )
  }
}

const AppStackNavigator = new StackNavigator( {
  Home: {screen: Home},
  Traffic: {screen: Traffic}
}, {
  initialRouteName: 'Home',
});

/*
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <AndroidToolbar />
        <Home />
      </View>
    );
  }
}
*/
