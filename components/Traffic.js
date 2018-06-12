import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from 'react-native';
import {List} from 'react-native-elements';

type Props = {};
export default class Traffic extends Component<Props> {
  state = {
    data: []
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2");
    const json = await response.json();
    this.setState({data: json.Features});
  }

  setURL = (cam, type) => {
    let sdotURL = "http://www.seattle.gov/trafficcams/images/";
    let wsdotURL = "http://images.wsdot.wa.gov/nw/";
    return (type === "sdot" ? `${sdotURL}${cam}`: `${wsdotURL}${cam}`);
  }

  static navigationOptions = {
    title: 'Traffic Cameras',
    headerStyle: {
      backgroundColor: 'steelblue'
    }
  }

  setCamDimensions = (type) => {
    let style = {};
    type === 'sdot' ? style = {width: 375, height: 300} : style = {width: 335, height: 249};
    return style;
  }

  render() {
    return (
        <List>
          <FlatList style={styles.flatList}
            data={this.state.data}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({item}) =>
            <View style={styles.container}>
            <Image
              source = {{uri: this.setURL(item.Cameras[0].ImageUrl, item.Cameras[0].Type) }}
              style = {this.setCamDimensions(item.Cameras[0].Type)}
            />
            <Text style={styles.titleText}>
              {item.Cameras[0].Description}
            </Text>
            <Text style={styles.subtitleText}>
              {item.Cameras[0].Type}
            </Text>
          </View>}
          />
        </List>
    );
  }
} //end class

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatList: {
    marginTop: 10
  },
  titleText: {
    color: 'black',
    fontSize: 20
  },
  subtitleText: {
    fontSize: 15,
    marginBottom: 15
  },
  SDOTimage: {
    width: 375,
    height: 300
  },
  WSDOTimage: {
    width: 335,
    height: 249
  }
});
