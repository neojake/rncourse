import React, { Component } from 'react'
import { TextInput, Button, View, StyleSheet } from 'react-native'

export default class PlaceInput extends Component {
  
    state = {
        placeName: '',        
    }

    placeNameChangedHandler = val => {
        this.setState({
            placeName: val
        })
    }

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === "") {
            return;
        }
        
        this.props.onPlaceAdded(this.state.placeName);
    }
  
    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.placeInput}
                    placeholder="A awesome component"
                    value={this.state.placeName}
                    onChangeText={this.placeNameChangedHandler}                    
                />
                <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    placeInput: {
        width: "70%"
    },
    placeButton: {
        width: "30%"
    },
});