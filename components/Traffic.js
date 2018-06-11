import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  Alert,
  Text,
  View,
  FlatList
} from 'react-native';
import {List, ListItem} from 'react-native-elements';

type Props = {};
export default class Traffic extends Component<Props> {

  state = {
    data: []
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=17&type=2");
    const json = await response.json();
    this.setState({data: json.Features});
  }

  render() {
    return (
      <View>
        <List>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({item}) =>
            <ListItem
              roundAvatar
              avatar={ {uri: `http://www.seattle.gov/trafficcams/images/${item.Cameras[0].ImageUrl}` } }
              title={item.Cameras[0].Description}
            />}
          />
        </List>
      </View>
    );
  }
}
