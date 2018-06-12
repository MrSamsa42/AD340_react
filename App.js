import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';

//import screens
import Home from './components/Home';
import Traffic from './components/Traffic';

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
