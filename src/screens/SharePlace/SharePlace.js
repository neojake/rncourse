import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../component/PlaceInput/PlaceInput';
import MainText from "../../component/UI/MainText/MainText";
import HeadingText from "../../component/UI/HeadingText/HeadingText"
import PickImage from "../../component/PickImage/PickImage";
import PickLocation from "../../component/PickLocation/PickLocation";
class SharePlaceScreen extends Component {
  
  static navigatorStyle = {
    navBarButtonColor : 'orange'
  }

  state = {
    placeName: ""
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  };

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  }

  placeNameChangedHandler = val => {    
    this.setState({
      placeName: val
    })
  }

  placeAddedHandler = () => {    
    if(this.state.placeName.trim() !== "") {
      this.props.onAddPlace(this.state.placeName);
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput 
            placeName={this.state.placeName} 
            onChangeText={this.placeNameChangedHandler} />
          <View style={styles.button}>
            <Button title="Share the place" onPress={() => this.placeAddedHandler()}></Button>
          </View>
          <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        </View>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName)),
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150,
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

export default connect(null, mapDispatchToProps)(SharePlaceScreen);