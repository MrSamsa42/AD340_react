import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from 'react-native';
import { List } from 'react-native-elements';

export default class Traffic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  /** 
   * Fetches traffic cam data.  Note the 'zoom' level query string parameter.
   * Range is 10-19.  Zoom level 18 ensures only one camera per PointCoordinate.
   * 
  */
  fetchData = async () => {
    try {
      const response = await fetch("https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2");
      const json = await response.json();
      this.setState({ data: json.Features });
    } catch (err) {
      console.warn("Error fetching data");
      this.setState({ error: true })
    }
  }

  /**
   * Sets the complete url for the traffic cam image resource provided by seattle.gov API.  
   * @param {string} cam - camera image resource, e.g. "image_name.jpg"
   * @param {string} source - the source of the image resource, either 'sdot' or 'wsdot'
   * @return {string} - complete path to the image resource
   */
  setURL = (cam, source) => {
    let sdotURL = "http://www.seattle.gov/trafficcams/images/";
    let wsdotURL = "http://images.wsdot.wa.gov/nw/";
    return (source === "sdot" ? `${sdotURL}${cam}` : `${wsdotURL}${cam}`);
  }

  static navigationOptions = {
    title: 'Traffic Cameras',
    headerStyle: {
      backgroundColor: 'steelblue'
    }
  }

  /**
   * Sets the dimensions for images, depending on the source, to maintain original aspect ratio.  
   * @param {string} source - the source of the image resource, either 'sdot' or 'wsdot'
   * @return {Object} style - object specfiying fixed width and height
   */
  setCamDimensions = (source) => {
    let style = {};
    source === 'sdot' ? style = { width: 375, height: 300 } : style = { width: 335, height: 249 };
    return style;
  }

  render() {
    const trafficContent = (
      <List>
        <FlatList style={styles.flatList}
          data={this.state.data}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) =>
            <View style={styles.container}>
              <Image
                source={{ uri: this.setURL(item.Cameras[0].ImageUrl, item.Cameras[0].Type) }}
                style={this.setCamDimensions(item.Cameras[0].Type)}
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

    const errorContent = (
      <View>
        <Text style={styles.titleText}>Traffic cam data is not available at this time.</Text>
      </View>
    );

    return (
      <View>
        {this.state.error ? errorContent : trafficContent}
      </View>
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
