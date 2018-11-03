import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions/index';
import MapView from 'react-native-maps';

class PlaceDetailScreen extends Component {    

    state = {
        viewMode : "portrait",
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122,
            locationChosen: false,
        }
    }

    constructor(props) {
      super(props);
      Dimensions.addEventListener("change", this.updateStyles);
    }
    
    componentDidMount() {
        this.getInitialRegion();
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    }

    placeDeleteHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }

    getInitialRegion = () => {
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: this.props.selectedPlace.location.latitude,
                    longitude: this.props.selectedPlace.location.longitude
                },                
            }
        });
    }

    render () {
    
        return (
            <View style={[styles.container, this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer]}>
                <View style={styles.subContainer}>
                    <Image source={this.props.selectedPlace.image}
                        style={styles.placeImage}
                    />
                </View>
                <View style={styles.subContainer}>
                <MapView  
                    initialRegion={this.state.focusedLocation}                   
                    style={styles.map}                                        
                    ref={ref => this.map = ref}

                >
                    <MapView.Marker coordinate={this.props.selectedPlace.location} title="You clicked!" />
                </MapView>
                </View>
                <View>
                    <View>
                        <Text style={styles.placeName}>{this.props.selectedPlace.placeName}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeleteHandler}>
                            <View style={styles.deleteButton}>
                                <Icon size={30} name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="red" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }    
};

const styles = StyleSheet.create({
    container: {
        margin : 32,
        flex: 1
    },
    portraitContainer: {
        flexDirection: "column"
    },  
    landscapeContainer: {
        flexDirection: "row"
    },
    placeImage : {
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center",
    },
    subContainer: {
        flex: 1
    },
    map: {
        width: "100%",
        height: 250,
    },
})


const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
}

export default connect(null,mapDispatchToProps)(PlaceDetailScreen);

