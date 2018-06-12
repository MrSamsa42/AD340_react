import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';

import AndroidToolbar from './AndroidToolbar';


type Props = {};
export default class Home extends Component<Props> {

  static navigationOptions = {
    header: null
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View>
        <AndroidToolbar />
        <View style={styles.container}>
          <Text style={styles.titleText}>I am the home screen!</Text>
          <Button
            onPress={() => navigate('Traffic')}
            title="Show Traffic Cameras"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    marginTop: 100,
    marginBottom: 20,
    color: 'black',
    fontSize: 20
  }
});
