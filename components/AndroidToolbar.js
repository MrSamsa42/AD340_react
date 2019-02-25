import React, { Component } from 'react';
import { StyleSheet, View, ToolbarAndroid } from 'react-native';

export default class AndroidToolbar extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Adler React Native App"
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  toolbar: {
    height: 50,
    backgroundColor: 'steelblue'
  }
});
