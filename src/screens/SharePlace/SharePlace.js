import React, { Component } from 'react'
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../component/PlaceInput/PlaceInput';
import MainText from "../../component/UI/MainText/MainText";
import HeadingText from "../../component/UI/HeadingText/HeadingText"
import PickImage from "../../component/PickImage/PickImage";
import PickLocation from "../../component/PickLocation/PickLocation";
import validate from '../../utility/validation';
class SharePlaceScreen extends Component {
  
  static navigatorStyle = {
    navBarButtonColor : 'orange'
  }

  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false,
      }
    }
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
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      }
    });
  }

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    });
  }

  placeAddedHandler = () => {        
    this.props.onAddPlace(this.state.controls.placeName.value, this.state.controls.location.value);    
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation onLocationPick={this.locationPickedHandler}/>
          <PlaceInput             
            onChangeText={this.placeNameChangedHandler}
            placeData={this.state.controls.placeName} />
          <View style={styles.button}>
            <Button title="Share the place" onPress={this.placeAddedHandler}
            disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid}></Button>
          </View>          
        </View>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, locaiton) => dispatch(addPlace(placeName, locaiton)),
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