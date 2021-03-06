import React, { Component } from 'react'
import { View, Button, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
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
      },
      image: {
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

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    });
  }

  placeAddedHandler = () => {        
    this.props.onAddPlace(
      this.state.controls.placeName.value, 
      this.state.controls.location.value,
      this.state.controls.image.value
    );    
  }

  render() {

    let submitButton = (<Button title="Share the place" onPress={this.placeAddedHandler}
      disabled={
        !this.state.controls.placeName.valid ||
        !this.state.controls.location.valid ||
        !this.state.controls.image.valid
    }></Button>);

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation onLocationPick={this.locationPickedHandler}/>
          <PlaceInput             
            onChangeText={this.placeNameChangedHandler}
            placeData={this.state.controls.placeName} />
          <View style={styles.button}>
            {submitButton}
          </View>          
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading : state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, locaiton, image) => dispatch(addPlace(placeName, locaiton, image)),
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

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);