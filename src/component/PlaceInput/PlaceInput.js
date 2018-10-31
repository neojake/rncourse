import React, { Component } from 'react'
import { Button, View, StyleSheet } from 'react-native'
import DefaultInput from '../UI/DefaultInput/DefaultInput';
 
const placeInput = props => (           
    <DefaultInput 
        placeholder="Place Name" 
        value={props.placeName} 
        onChangeText={props.onChangeText} />                            
);    

export default placeInput;